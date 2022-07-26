import React from "react"
import { Ionicons } from "@expo/vector-icons"

export default function TabBarIcon({ name, focused }) {
    return (
        <Ionicons
            name={name}
            size={30}
            color={focused ? "tomato" : "black"}
            style={{ marginBottom: -10 }}
        />
    )
}