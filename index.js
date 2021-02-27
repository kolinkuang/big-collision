import Gameboard from './gameboard.js';

const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

new Gameboard(width, height, ctx);
