import React, { useEffect, useState } from 'react';
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
}

  export default App;