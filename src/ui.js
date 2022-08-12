"use strict";

const boostMenuContainerElement = document.getElementById("boost-container");
const settingsMenuContainerElement = document.getElementById("settings-container");

let activeMenu = boostMenuContainerElement;
settingsMenuContainerElement.classList.add("is-removed-from-layout");

const boostMenuButtonElement = document.getElementById("boost-menu-button");
const settingsMenuButtonElement = document.getElementById("settings-menu-button");

const selectedButtonBorderColor = 'Orange';
const defaultButtonBorderColor = 'Black';

let activeMenuButton = boostMenuButtonElement;
boostMenuButtonElement.style.borderColor = selectedButtonBorderColor;
settingsMenuButtonElement.style.borderColor = defaultButtonBorderColor; 

function openMenu(clickedMenu, clickedMenuButton) {
    activeMenu.classList.add("is-removed-from-layout");
    activeMenuButton.style.borderColor = defaultButtonBorderColor;
    activeMenu = clickedMenu;
    activeMenuButton = clickedMenuButton;
    activeMenuButton.style.borderColor = selectedButtonBorderColor;
    activeMenu.classList.remove("is-removed-from-layout");
}