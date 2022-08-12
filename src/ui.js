"use strict";

const mainMenuContainerElement = document.getElementById("main-container");
const settingsMenuContainerElement = document.getElementById("settings-container");

let activeMenu = mainMenuContainerElement;
settingsMenuContainerElement.classList.add("is-removed-from-layout");

const mainMenuButtonElement = document.getElementById("main-menu-button");
const settingsMenuButtonElement = document.getElementById("settings-menu-button");

const selectedButtonBorderColor = 'Orange';
const defaultButtonBorderColor = 'Black';

let activeMenuButton = mainMenuButtonElement;
mainMenuButtonElement.style.borderColor = selectedButtonBorderColor;
settingsMenuButtonElement.style.borderColor = defaultButtonBorderColor; 

function openMenu(clickedMenu, clickedMenuButton) {
    activeMenu.classList.add("is-removed-from-layout");
    activeMenuButton.style.borderColor = defaultButtonBorderColor;
    activeMenu = clickedMenu;
    activeMenuButton = clickedMenuButton;
    activeMenuButton.style.borderColor = selectedButtonBorderColor;
    activeMenu.classList.remove("is-removed-from-layout");
}