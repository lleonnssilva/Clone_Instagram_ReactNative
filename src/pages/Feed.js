import React, { Component } from "react";

import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import camera from "../assets/camera.png";
import styles from "./stylesFeed";
import api from "../services/api";
import more from "../assets/more.png";

import like from "../assets/like.png";
import comment from "../assets/comment.png";
import send from "../assets/send.png";
import io from "socket.io-client";

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("New");
        }}
      >
        <Image style={{ marginRight: 30 }} source={camera} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };
  registerToSocket = () => {
    const socket = io("https://api-instagram-leo.herokuapp.com");

    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      });
    });
  };
  handleLike = async id => {
    await api.post(`posts/${id}/like`);
  };
  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get("/posts");
    this.setState({
      feed: response.data
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
                <Image source={more} />
              </View>
              <Image
                style={styles.feedImage}
                source={{
                  uri: `https://api-instagram-leo.herokuapp.com/files/${
                    item.image
                  }`
                }}
              />
              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.handleLike(item._id)}
                  >
                    <Image source={like} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.like}>{item.likes} curtidas</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
