import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedImage: {
    width: "100%",
    height: 400,
    marginVertical: 15
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },
  hashtags: {},
  description: {},
  like: {},
  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },
  name: { fontSize: 14, color: "#000" },
  actions: {
    flexDirection: "row"
  },
  action: {
    marginRight: 8
  },
  likes: { marginTop: 15, fontWeight: "bold", color: "#000" },
  description: { lineHeight: 18, color: "#000" },
  hashtags: {
    color: "#7159c1"
  }
});
export default Style;
