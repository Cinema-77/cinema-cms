import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu';
import { IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from 'react-icons/fi';

import { FOOD_FORM } from '@/constants';
import { ComboItem } from '@/features/seller';
import { useFoodStore } from '@/stores/food';

interface FoodDropdownProps {
  food: ComboItem;
  onDelete: () => void;
}

export const FoodDropdown: React.FC<FoodDropdownProps> = ({ food, onDelete }) => {
  const { onOpen: openFoodForm, setType } = useFoodStore();

  const onEdit = () => {
    openFoodForm();
    setType({
      type: FOOD_FORM.EDIT,
      data: {
        name: food.name,
        price: food.price.toString(),
        unit: food.unit,
        image: food.image,
      },
      foodId: food._id,
      imageSource: food.image,
    });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FiEdit2 />} command="⌘T" onClick={onEdit}>
          Chỉnh sửa
        </MenuItem>
        <MenuItem icon={<FiTrash2 />} command="⌘N" onClick={onDelete}>
          Xoá
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
