import firestore from '@react-native-firebase/firestore';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';

export interface UserState {
  value: number;
  dataName: String,
  records: Record[];
  userData: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  value: 0,
  dataName: 'Unknown',
  records: [],
  userData: null,
  status: 'idle',
};

interface User {
  Name: String;
  Capacity: any;
  Remaining: any;
}

interface Record {
  Aqua: any;
  Khac: any;
  Name: any;
  SoLuong: any;
  ThoiGianString: any; // Specify the type as string array
  ThoiGian: any; // Specify the type as string array
  Value: number;
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload;
    },
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
  },

  // Đặt trạng thái khi fetchUser
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.userData = action.payload.data;
          state.dataName = action.payload.userName;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(getRecord.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.records = action.payload;
        }
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userQRID: string) => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .where('Name', '==', userQRID)
        .get();

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const foundUserID = doc.id;
        const userData = doc.data() as User;
        console.log(userData);
        return { userID: foundUserID, data: userData, userName: userQRID };
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const getRecord = createAsyncThunk<Record[], string>('record/getRecord', async (userQRID: string) => {
  try {
    const querySnapshot = await firestore().collection('Records')
    .where('Name', '==', userQRID)
    .get();
    if (!querySnapshot.empty) {
      const records: Record[] = querySnapshot.docs.map((doc) => {
        const recordData = doc.data() as Record;
        const timestamp = recordData.ThoiGian;
        const date = new Date(timestamp.seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0'); // Định dạng ngày với 2 chữ số, thêm '0' nếu cần
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Định dạng tháng với 2 chữ số, thêm '0' nếu cần
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        recordData.ThoiGianString = formattedDate;
        return recordData;
      });
      const sortedRecords = records.sort((a, b) => a.ThoiGian.seconds - b.ThoiGian.seconds);
      return records;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const addRecord = createAsyncThunk(
  'record/addRecord',
  async (record: any) => {
    try {
      const docRef = await firestore().collection('Records').add(record);
      console.log('Record added successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding record:', error);
      throw error;
    }
  },
);

export const deleteRecord = createAsyncThunk(
  'record/deleteRecord',
  async (recordName: string) => {
    try {
      const querySnapshot = await firestore()
        .collection('Records')
        .where('Name', '==', recordName)
        .get();

      const deletePromises = querySnapshot.docs.map((documentSnapshot) =>
        documentSnapshot.ref.delete()
      );

      await Promise.all(deletePromises);

      console.log('Records with Name:', recordName, 'deleted successfully');
    } catch (error) {
      console.error('Error deleting records:', error);
      throw error;
    }
  }
);

export const {setRecords, setUserData } = UserSlice.actions;

export default UserSlice.reducer;