import React, { useEffect, useState, useRef } from 'react';
//import {format} from 'date-fns'
import './App.css';


const SnakeGame = () => {
  //cobrinha pode se mexer em 8 fileiras de 32 quadrados X e Y
  const[snake, setSnake] = useState([{ x: 8 * 32, y: 8 * 32}]);

  const[direction, setDirection] =useState('right');

  const[food, setFood] = useState({ //posição randômica da maçâ
  x: Math.floor(Math.random() * 15 + 1) * 32,
  y: Math.floor(Math.random() * 15 + 1) * 32,
  })

  //o useRef utiliza o último ponto
  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const foodRef = useRef(food);

  useEffect(() => {
    const handleKeyDown = (event) => {
      //keyCode identifica cada tecla do teclado com um valor especifico
      if(event.keyCode === 37 && directionRef.current !== 'right')
      setDirection('left')
      if(event.keyCode === 38 && directionRef.current !== 'down')
      setDirection('up')
      if(event.keyCode === 39 && directionRef.current !== 'left')
      setDirection('right')
      if(event.keyCode === 40 && directionRef.current !== 'up')
      setDirection('down')
    };

    window.addEventListener('keydown', handleKeyDown);

    const game = setInterval(startGame, 200)
    //executa a função startGame a cada 200 milisegundos
    return() => {
      clearInterval(game)
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  const createSnake = () => {
    const canvas = document.getElementById('snake');

    //getContext vai pegar o elemento e criar um quadrado que representará a cobra
    const context = canvas.getContext ('2d');
    for(let i = 0; i < snakeRef.current.length; i++){
      context.fillStyle = 'green'
      context.fillRect(snakeRef.current[i].x, snakeRef.current[i].y, 32, 32);

    }
  }

  const createBG = () => {
    const canvas = document.getElementById('snake');
    const context = canvas.getContext ('2d');

    context.fillStyle = 'white'
    context.fillRect(0, 0, 16 * 32, 16 * 32);
  }

  const createFood = () => {
    
    const canvas = document.getElementById('snake');
    const context = canvas.getContext('2d');

    context.fillStyle = 'red'
    context.fillRect(foodRef.current.x, foodRef.current.y, 32, 32)
  }

  const startGame = () => {
    let newSnake = [...snakeRef.current]
    let head = {...newSnake[0]}

    switch(directionRef.current) {
      case 'right':
        head.x += 32;
        break;
        case 'left':
          head.x -= 32;
          break;
          case 'up':
            head.y -= 32;
            break;
            case 'down':
              head.y += 32;
              break;

    }

    //faz com que a cobrinha passe pelas bordas
    if (head.x >= 16 * 32) head.x = 0;
    if (head.x < 0) head.x = 15 * 32;
    if (head.y >= 16 * 32) head.y = 0;
    if (head.y < 0) head.y = 15 * 32;

    //verifica se a cobrinha relou na própria cauda
    for(let i=0; i < newSnake.length; i++) {
      if(head.x === newSnake[i].x && head.y === newSnake[i].y) {
        alert('Game Over.😫')
        return;
      }
    }

    //método unshift insere o objeto 'head' em 'newSnake'
    newSnake.unshift(head)

    //verifica se a cobrinha comeu a maçã
    if(head.x === foodRef.current.x && head.y === foodRef.current.y){
      const newFood
 = {
  x: Math.floor(Math.random() * 15 + 1) * 32,
  y: Math.floor(Math.random() * 15 + 1) * 32,
 } 

setFood(newFood);
foodRef.current = newFood;
} else {
  newSnake.pop()
}

//atualizando a versão da cobra para nova cobra, onde ela muda de posição
setSnake(newSnake)

//chamando as funções para criar o background, maçã e a cobra
createBG();
createFood();
createSnake();

  };
   
  return (
    <div>
      <h1>Snake Game: 🐍</h1>
      <canvas id="snake" width="512" height="512"></canvas>
    </div>
  )
}

  export default SnakeGame;
