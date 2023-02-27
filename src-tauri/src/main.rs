#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};

fn main() {
    let menu = Menu::with_items([Submenu::new(
        "File",
        Menu::with_items([
            CustomMenuItem::new("new", "New").into(),
            CustomMenuItem::new("open", "Open").into(),
            CustomMenuItem::new("save", "Save").into(),
            CustomMenuItem::new("save_as", "Save As").into(),
        ]),
    )
    .into()]);

    tauri::Builder::default()
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
