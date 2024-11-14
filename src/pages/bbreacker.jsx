import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Alert,
} from 'react-native';
import Navbar from '../components/NavigationBar';

const { width, height } = Dimensions.get('window');

const Bbreacker = ({ navigation }) => {
  // Game constants
  const paddleWidth = 100;
  const paddleHeight = 20;
  const paddleY = height - 100;
  const ballSize = 20;
  const initialBallPosition = {
    x: width / 2 - ballSize / 2,
    y: paddleY - ballSize - 1, // Start just above the paddle
  };
  const initialBallVelocity = { x: 150, y: 150 }; // Positive Y-velocity to move downward

  // State variables
  const [paddleX, setPaddleX] = useState(width / 2 - paddleWidth / 2);
  const [ballPosition, setBallPosition] = useState(initialBallPosition);
  const [bricks, setBricks] = useState([]);

  // Refs for mutable variables
  const ballPositionRef = useRef(ballPosition);
  const ballVelocityRef = useRef(initialBallVelocity);
  const lastTimeRef = useRef(null);
  const bricksRef = useRef(bricks);
  const animationFrameIdRef = useRef(null);

  // Initialize bricks
  useEffect(() => {
    const brickRows = 5;
    const brickColumns = 6;
    const brickWidth = width / brickColumns;
    const brickHeight = 20;
    let tempBricks = [];
    for (let row = 0; row < brickRows; row++) {
      for (let col = 0; col < brickColumns; col++) {
        tempBricks.push({
          x: col * brickWidth,
          y: row * brickHeight + 50,
          width: brickWidth,
          height: brickHeight,
          destroyed: false,
        });
      }
    }
    setBricks(tempBricks);
    bricksRef.current = tempBricks;
  }, []);

  // Game loop using requestAnimationFrame
  useEffect(() => {
    // Start the game loop
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    // Clean up on unmount
    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, []);

  // Move gameLoop function outside useEffect
  const gameLoop = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    let deltaTime = (timestamp - lastTimeRef.current) / 1000; // Convert to seconds

    // Limit deltaTime to prevent large jumps
    deltaTime = Math.min(deltaTime, 0.02); // Max deltaTime of 20ms

    lastTimeRef.current = timestamp;

    // Update ball position
    let newX =
      ballPositionRef.current.x + ballVelocityRef.current.x * deltaTime;
    let newY =
      ballPositionRef.current.y + ballVelocityRef.current.y * deltaTime;

    // Check for wall collisions
    if (newX <= 0) {
      ballVelocityRef.current.x = Math.abs(ballVelocityRef.current.x);
      newX = 0;
    } else if (newX + ballSize >= width) {
      ballVelocityRef.current.x = -Math.abs(ballVelocityRef.current.x);
      newX = width - ballSize;
    }

    if (newY + ballSize >= height) {
      // Ball has hit the bottom of the screen (missed the paddle)
      cancelAnimationFrame(animationFrameIdRef.current);
      Alert.alert('Game Over!', 'Try again?', [
        { text: 'OK', onPress: () => resetGame() },
      ]);
      return;
    } else if (newY <= 0) {
      ballVelocityRef.current.y = Math.abs(ballVelocityRef.current.y);
      newY = 0;
    }

    // Check for paddle collision using AABB
    if (
      newX + ballSize > paddleX &&
      newX < paddleX + paddleWidth &&
      newY + ballSize > paddleY &&
      newY < paddleY + paddleHeight
    ) {
      ballVelocityRef.current.y = -Math.abs(ballVelocityRef.current.y); // Make the ball move upward
      newY = paddleY - ballSize - 1; // Position the ball just above the paddle
    }

    // Check for brick collisions
    let remainingBricks = bricksRef.current.map((brick) => ({ ...brick }));
    for (let i = 0; i < remainingBricks.length; i++) {
      let brick = remainingBricks[i];
      if (!brick.destroyed) {
        if (
          newX + ballSize > brick.x &&
          newX < brick.x + brick.width &&
          newY + ballSize > brick.y &&
          newY < brick.y + brick.height
        ) {
          ballVelocityRef.current.y = -ballVelocityRef.current.y;
          brick.destroyed = true;
          remainingBricks[i] = brick;
          break;
        }
      }
    }
    setBricks(remainingBricks);
    bricksRef.current = remainingBricks;

    // Update ball position
    setBallPosition({ x: newX, y: newY });
    ballPositionRef.current = { x: newX, y: newY };

    // Request next frame
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);
  };

  // Paddle movement
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      let newPaddleX = gestureState.moveX - paddleWidth / 2;
      if (newPaddleX < 0) newPaddleX = 0;
      if (newPaddleX + paddleWidth > width) newPaddleX = width - paddleWidth;
      setPaddleX(newPaddleX);
    },
    onPanResponderRelease: () => {},
  });

  // Reset game function
  const resetGame = () => {
    cancelAnimationFrame(animationFrameIdRef.current); // Cancel existing animation frame
    // Reset game state
    setBallPosition(initialBallPosition);
    ballPositionRef.current = initialBallPosition;
    ballVelocityRef.current = { ...initialBallVelocity };
    const resetBricks = bricksRef.current.map((brick) => ({
      ...brick,
      destroyed: false,
    }));
    setBricks(resetBricks);
    bricksRef.current = resetBricks;
    lastTimeRef.current = null;

    // Restart the game loop
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);
  };

  return (
    <View style={styles.container}>
      {/* Bricks */}
      {bricks.map((brick, index) =>
        !brick.destroyed ? (
          <View
            key={index}
            style={{
              position: 'absolute',
              left: brick.x,
              top: brick.y,
              width: brick.width,
              height: brick.height,
              backgroundColor: 'blue',
            }}
          />
        ) : null
      )}
      {/* Ball */}
      <View
        style={{
          position: 'absolute',
          left: ballPosition.x,
          top: ballPosition.y,
          width: ballSize,
          height: ballSize,
          borderRadius: ballSize / 2,
          backgroundColor: 'red',
        }}
      />
      {/* Paddle */}
      <View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          left: paddleX,
          top: paddleY,
          width: paddleWidth,
          height: paddleHeight,
          backgroundColor: 'green',
        }}
      />
      {/* Navbar */}
      <View style={styles.navbar}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Bbreacker;
