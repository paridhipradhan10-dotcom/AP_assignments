import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export default function Index() {
const [count, setCount] = useState(0);
const [isDarkMode, setIsDarkMode] = useState(false);
const handleIncrement = () => setCount(count + 1);
const handleDecrement = () => {
if (count > 0) setCount(count - 1);
};
const handleReset = () => setCount(0);
const toggleTheme = () => setIsDarkMode(!isDarkMode);
const themeStyles = {
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: isDarkMode ? "#121212" : "#ffffff",
},
text: {
fontSize: 40,
fontWeight: "bold",
color: isDarkMode ? "#ffffff" : "#000000",
marginBottom: 30,
},
button: {
backgroundColor: isDarkMode ? "#333333" : "#dddddd",
padding: 15,
margin: 10,
borderRadius: 8,

minWidth: 120,
alignItems: "center",
},
buttonText: {
fontSize: 18,
color: isDarkMode ? "#ffffff" : "#000000",
},
row: {
flexDirection: "row",
},
};
return (
<View style={themeStyles.container}>
<Text style={themeStyles.text}>{count}</Text>
{/* Increment / Decrement side by side */}
<View style={themeStyles.row}>
<TouchableOpacity style={themeStyles.button}
onPress={handleIncrement}>
<Text style={themeStyles.buttonText}>Increment</Text>
</TouchableOpacity>
<TouchableOpacity style={themeStyles.button}
onPress={handleDecrement}>
<Text style={themeStyles.buttonText}>Decrement</Text>
</TouchableOpacity>
</View>
{/* Reset button */}
<TouchableOpacity style={themeStyles.button} onPress={handleReset}>
<Text style={themeStyles.buttonText}>Reset</Text>
</TouchableOpacity>
{/* Theme toggle button */}
<TouchableOpacity style={themeStyles.button} onPress={toggleTheme}>
<Text style={themeStyles.buttonText}>
{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
</Text>
</TouchableOpacity>
</View>
);
}
