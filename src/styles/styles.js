import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { backgroundColor: "#3B82F6", padding: 16, flexDirection: "row", alignItems: "center" },
  avatar: { width: 72, height: 72, backgroundColor: "#4B5563", borderRadius: 36, justifyContent: "center", alignItems: "center" },
  userInfo: { marginLeft: 16 },
  userName: { color: "white", fontSize: 20, fontWeight: "bold" },
  userEmail: { color: "#D1D5DB", fontSize: 14 },
  drawerItems: { flex: 1, paddingHorizontal: 16, marginTop: 16 },
  drawerItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderRadius: 8, paddingHorizontal: 8, backgroundColor: "#FFFFFF", elevation: 2, marginBottom: 12 },
  drawerItemText: { marginLeft: 16, fontSize: 16, color: "#374151", fontWeight: "600" },
  logoutButton: { backgroundColor: "#EF4444", margin: 16, padding: 12, borderRadius: 8, elevation: 2 },
  logoutButtonText: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 },
});
