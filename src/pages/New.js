import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import api from "../services/api";
import styles from "./stylesNew";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";

export default class New extends Component {
  static navigationOptions = {
    headerTitle: "Nova publicação"
  };

  state = {
    author: "",
    place: "",
    description: "",
    hashtags: "",
    preview: null,
    image: null
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Selecionar Imagem"
      },
      upload => {
        if (upload.error) {
          console.log("Error");
        } else if (upload.didCancel) {
          console.log("User Canceled");
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split(".");
            ext = ext.toLocaleLowerCase() === "heic" ? "jpg" : ext;
          } else {
            prefix = new Date().getTime();
            ext = "jpg";
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`
          };
          this.setState({ preview, image });
        }
      }
    );
  };

  handleSubmit = async e => {
    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);
    this.props.navigation.navigate("Feed");
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleSelectImage}
          style={styles.selectButton}
        >
          <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {this.state.preview && (
          <Image style={styles.preview} source={this.state.preview} />
        )}
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do Autor"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Lugar"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />
        <TouchableOpacity
          onPress={this.handleSubmit}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
