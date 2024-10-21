import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function CalculatorButton({ text, onClick }) {
  return (
    <TouchableOpacity
      style={styles.calculatorButton}
      onPress={() => onClick(text)}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [tokensList, setTokensList] = useState([]);
  const [result, setResult] = useState("");

  const onClickBtn = (symbol) => {
    if (symbol === "C") {
      setTokensList([]);
      setResult("");
      return;
    }

    if (symbol === "=") {
      const expression = tokensList.join("");
      try {
        setResult(eval(expression));
        setTokensList([]);
      } catch {
        setResult("Erro ao calcular");
      }
      return;
    }

    setTokensList([...tokensList, symbol]);
  };

  const rows = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["C", "0", "+", "="],
  ];

  return (
    <View style={styles.appContainer}>
      <div style={styles.display}>
        <Text style={styles.tokensDisplay}>{tokensList.join(" ")}</Text>

        <Text style={styles.resultDisplay}>{result}</Text>
      </div>

      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((symbol) => (
            <CalculatorButton key={symbol} text={symbol} onClick={onClickBtn} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    padding: 16,
    border: "2px solid #e1e1e1",
    borderRadius: "16px",
  },
  display: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid #e1e1e1",
    borderRadius: "8px",
    width: "100%",
    marginBottom: "8px",
    minHeight: "3.5rem",
    gap: "4px",
  },
  tokensDisplay: {
    fontSize: 24,
    textAlign: "center",
    minHeight: "1.5rem",
  },
  resultDisplay: {
    fontSize: 24,
    textAlign: "center",
    color: "gray",
    minHeight: "1.5rem",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  calculatorButton: {
    fontSize: 24,
    padding: 12,
    margin: 4,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
  },
});
