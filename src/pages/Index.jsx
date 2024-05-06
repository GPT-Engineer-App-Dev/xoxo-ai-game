import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  };

  const renderSquare = (index) => (
    <Button onClick={() => handleClick(index)} p={10} w="100%" h="100%" fontSize="3xl">
      {board[index]}
    </Button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Heading mb={8}>Tic-Tac-Toe Game</Heading>
        <Flex wrap="wrap" w="300px" h="300px">
          {Array.from({ length: 9 }).map((_, index) => (
            <Box key={index} w="33.333%" h="33.333%">
              {renderSquare(index)}
            </Box>
          ))}
        </Flex>
        <Text fontSize="xl" my={4}>
          {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}
        </Text>
        <Button onClick={resetGame} colorScheme="blue">Reset Game</Button>
      </Flex>
    </Container>
  );
};

export default Index;