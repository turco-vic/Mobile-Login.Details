import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

const TextoExibido = ({ titulo, texto, cor }) => (
    <View style={[styles.textoContainer, !texto && styles.textoVazio]}>
        <Text style={[styles.texto, { color: cor }]}>
            {titulo}: {texto || "Nenhum texto salvo"}
        </Text>
    </View>
);

export default function HomeScreen({ navigation }) {
    const [texto, setTexto] = useState("");
    const [textoPersistido, setTextoPersistido] = useState("");
    const [textoSalvoSemPersistencia, setTextoSalvoSemPersistencia] = useState("");
    const [inputFocado, setInputFocado] = useState(false);

    useEffect(() => {
        const carregarTextoPersistido = async () => {
            const textoSalvo = await SecureStore.getItemAsync("meuTexto");
            if (textoSalvo) {
                setTextoPersistido(textoSalvo);
            }
        };
        carregarTextoPersistido();
    }, []);

    const salvarTexto = async () => {
        if (!texto.trim()) {
            alert("Por favor, insira algo.");
            return;
        }
        await SecureStore.setItemAsync("meuTexto", texto);
        setTextoPersistido(texto);
        setTextoSalvoSemPersistencia(texto);
        setTexto("");
    };

    const limparTexto = async () => {
        await SecureStore.deleteItemAsync("meuTexto");
        setTextoPersistido("");
        setTextoSalvoSemPersistencia("");
        alert("Texto apagado da persistência!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Persistência e Navegação</Text>
            <TextInput
                style={[styles.input, inputFocado && styles.inputAtivo]}
                placeholder="Digite algo"
                value={texto}
                onChangeText={setTexto}
                onFocus={() => setInputFocado(true)}
                onBlur={() => setInputFocado(false)}
            />

            <TextoExibido titulo="Sem persistência" texto={textoSalvoSemPersistencia} cor="red" />
            <TextoExibido titulo="Texto persistido" texto={textoPersistido} cor="green" />

            <TouchableOpacity style={styles.botao} onPress={salvarTexto} activeOpacity={0.7}>
                <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={limparTexto} activeOpacity={0.7}>
                <Text style={styles.textoBotao}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate("Detalhes", { textoNaoPersistido: textoSalvoSemPersistencia })}
                activeOpacity={0.7}
            >
                <Text style={styles.textoBotao}>Detalhes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 100,
        paddingHorizontal: 25,
        gap: 20,
        backgroundColor: "#F8F9FA",
    },
    titulo: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold",
        color: "#100B60",
    },
    input: {
        borderWidth: 1,
        borderColor: "#100B60",
        borderRadius: 8,
        padding: 10,
        fontSize: 20,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputAtivo: {
        borderColor: "#100B60",
        borderWidth: 2,
    },
    textoContainer: {
        padding: 10,
        borderRadius: 8,
    },
    textoVazio: {
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        borderColor: "#C0C0C0",
    },
    texto: {
        fontSize: 20,
        textAlign: "center",
    },
    botao: {
        backgroundColor: "#100B60",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textoBotao: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});
