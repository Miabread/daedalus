#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    let menu = Menu::with_items([
        Submenu::new(
            "File",
            Menu::with_items([
                CustomMenuItem::new("new", "New")
                    .accelerator("Ctrl+N")
                    .into(),
                CustomMenuItem::new("open", "Open")
                    .accelerator("Ctrl+O")
                    .into(),
                CustomMenuItem::new("save", "Save")
                    .accelerator("Ctrl+S")
                    .into(),
                CustomMenuItem::new("save_as", "Save As")
                    .accelerator("Shift+Ctrl+S")
                    .into(),
                MenuItem::Separator.into(),
                MenuItem::Quit.into(),
            ]),
        )
        .into(),
        Submenu::new(
            "Help",
            Menu::with_items([
                CustomMenuItem::new("github", "GitHub").into(),
                CustomMenuItem::new("about", "About").into(),
            ]),
        )
        .into(),
    ]);

    tauri::Builder::default()
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
