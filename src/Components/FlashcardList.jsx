import React from 'react';
import Flashcard from './Flashcard';

function FlashcardList({ flashcards }) {   // Ensure props are passed correctly
  return (
    <div className='card-grid'>
      {flashcards.map(flashcard => (
        <Flashcard flashcard={flashcard} key={flashcard.id} />
      ))}
    </div>
  );
}

export default FlashcardList;
