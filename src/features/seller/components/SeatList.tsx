import { Box, ListItem, List, Button, Stack } from '@chakra-ui/react';
import * as React from 'react';

import { Ticket, SeatType } from '@/features/seller';

interface SeatListProps {
  seats: SeatType[];
  selectedSeats: Ticket[];
  setSelectedSeats: (value: React.SetStateAction<Ticket[]>) => void;
}

export const SeatList: React.FC<SeatListProps> = ({ seats, selectedSeats, setSelectedSeats }) => {
  const onSelectSeat = (seat: Ticket) => {
    const hasSeat = selectedSeats.find((s) => s.seatName === seat.seatName);
    const selectedSeat = !hasSeat
      ? [...selectedSeats, seat]
      : selectedSeats.filter((s) => s.seatName !== seat.seatName);
    setSelectedSeats(selectedSeat);
  };

  const getColorScheme = (seat: any) => {
    if (seat.status == 1) {
      return 'red';
    }

    if (selectedSeats.includes(seat)) {
      return 'cyan';
    }
    return undefined;
  };

  return (
    <Box>
      <Stack spacing={2} alignItems="center" direction="column-reverse">
        {seats.map((b, index) => (
          <List display="flex" key={`${index}`}>
            <Button as={ListItem} width="20px" variant="outline">
              {b.nameRow}
            </Button>
            <Stack as={List} mx={3} spacing={2} direction="row">
              {b.seatsName.map((s, index) => {
                return (
                  <Button
                    key={s.idSeat}
                    width="20px"
                    colorScheme={getColorScheme(s)}
                    color={selectedSeats.includes(s) ? 'white' : undefined}
                    onClick={() => onSelectSeat(s)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </Stack>
            <Button as={ListItem} width="20px" variant="outline">
              {b.nameRow}
            </Button>
          </List>
        ))}
      </Stack>
    </Box>
  );
};
