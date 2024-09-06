import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  View,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

interface Item {
  id: string;
  name: string;
}

interface SearchFilterProps {
  data: Item[];
  placeholder?: string;
  borderColor?: string;
  inputHeight?: number;
  inputTextColor?: string;
  inputBackgroundColor?: string;
  itemTextColor?: string;
  itemBackgroundColor?: string;
  itemHeight?: number;
  itemWidth?: number;
  itemFontSize?: number;
  itemBorderColor?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  data,
  placeholder = "Rechercher...",
  borderColor = "#E1604D",
  inputHeight = screenHeight * 0.05,
  inputTextColor = "black",
  inputBackgroundColor = "white",
  itemTextColor = "black",
  itemBackgroundColor = "white",
  itemHeight = screenHeight * 0.05,
  itemWidth = screenWidth * 1.5,
  itemFontSize = 18,
  itemBorderColor = "gray",
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Item[]>(data);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const styles = (borderColor: string, height: number) => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: height,
        width: screenWidth / 1.2,
        margin: 12,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: isFocused === true ? borderColor : "grey",
        opacity: 0.5,
      },
      input: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        color: inputTextColor,
        backgroundColor: inputBackgroundColor,
      },
      item: {
        height: itemHeight,
        width: itemWidth,
        borderBottomWidth: 1,
        borderBottomColor: itemBorderColor,
        padding: 10,
        backgroundColor: itemBackgroundColor,
        justifyContent: "center",
        borderRadius: 10,
      },
      itemText: {
        color: itemTextColor,
        fontSize: itemFontSize,
      },
    });
  };

  const dynamicStyles = styles(borderColor, inputHeight);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={dynamicStyles.inputContainer}>
        <TextInput
          style={dynamicStyles.input}
          placeholder={placeholder}
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor={inputTextColor}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </View>
      {searchText === "" ? (
        <View></View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={dynamicStyles.item}>
              <Text style={dynamicStyles.itemText}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchFilter;
