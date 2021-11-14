import { ComboItem } from '@/features/seller';

export interface ComBosResponse {
  success: boolean;
  message: string;
  combos: ComboItem[];
}
