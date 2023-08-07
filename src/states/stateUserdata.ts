import { UserData } from '@/lib/types';
import { atom } from 'recoil';

export const UserDataState = atom<UserData>({
  key: 'userData',
  default: {
    id: 0,
    emp_no: 0,
    name: '',
    email: '',
    phone: '',
    hospital_id: 0,
    dept_id: 0,
    level: '',
    auth: '',
    status: '',
    annual: 0,
    duty: 0,
    profile_image_url: '',
    hiredate: '',
    created_at: '',
    updated_at: '',
  },
});
