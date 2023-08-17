import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {AppDispatch, RootState} from '../app/store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Item {
  time: string;
  quantity: number;
  aquaBottles: number;
  other: string;
}

const ITEMS_PER_PAGE = 5; // Số hàng hiển thị trên mỗi trang
const PAGINATION_WIDTH = windowWidth * 0.95; // Độ rộng của phần chứa nút chuyển trang

const YourComponent: React.FC = () => {
  const records = useSelector((state: RootState) => state.user.records);
  useEffect(() => {
    // Chuyển đổi dữ liệu từ `records` thành `data` và cập nhật state `data`
    const transformedData = records.map((record) => ({
      time: record.ThoiGianString,
      quantity: record.SoLuong,
      aquaBottles: record.Aqua,
      other: record.Khac,
    }));
    setData(transformedData);
  }, [records]);
  console.log(records);
  const [data, setData] = useState<Item[]>([
    { time: "2023-08-01", quantity: 10, aquaBottles: 5, other: "Lorem"},
    { time: "2023-08-02", quantity: 15, aquaBottles: 8, other: "0 2" },
    { time: "2023-08-03", quantity: 12, aquaBottles: 3, other: "0 3" },
  ]);
  const [page, setPage] = useState<number>(1);


  const renderEmptyData = (): JSX.Element => {
    return (
      <View style={styles.emptyDataContainer}>
        <Text style={styles.emptyDataText}>Hiện chưa có dữ liệu</Text>
      </View>
    );
  };

  const renderTableRows = (): JSX.Element[] => {
    const startIndex: number = (page - 1) * ITEMS_PER_PAGE;
    const endIndex: number = page * ITEMS_PER_PAGE;

    return data.slice(startIndex, endIndex).map((item: Item, index: number) => (
      <View key={index} style={styles.rowContainer}>
    <Text style={[styles.cell1, { flex: 0.3 }]}>{item.time}</Text>
    <Text style={[styles.cell2, { flex: 0.2 }]}>{item.quantity}</Text>
    <Text style={[styles.cell3, { flex: 0.25 }]}>{item.aquaBottles}</Text>
    <Text style={[styles.cell4, { flex: 0.25 }]}>{item.other}</Text>
      </View>
    ));
  };

  const renderPagination = (): JSX.Element => {
    const totalPages: number = Math.ceil(data.length / ITEMS_PER_PAGE);
    const isFirstPage: boolean = page === 1;
    const isLastPage: boolean = page === totalPages;
    const pageNumbers: JSX.Element[] = [];
    const visiblePageNumbers: number[] = [];
  
    // Xác định danh sách các trang hiển thị
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePageNumbers.push(i);
      }
    } else {
      if (page <= 2) {
        visiblePageNumbers.push(1, 2);
      } else if (page >= totalPages - 1) {
        visiblePageNumbers.push(totalPages - 1, totalPages);
      } else {
        visiblePageNumbers.push(page - 1, page, page + 1);
      }
    }
  
    for (let i = 0; i < visiblePageNumbers.length; i++) {
      const pageNumber = visiblePageNumbers[i];
      pageNumbers.push(
        <TouchableOpacity
          key={pageNumber}
          style={[styles.pageNumberContainer, pageNumber === page && styles.activePageNumberContainer]}
          onPress={() => setPage(pageNumber)}>
          <Text style={[styles.pageNumber, pageNumber === page && styles.activePage]}>{pageNumber}</Text>
        </TouchableOpacity>
      );
    }
  
    return (
      <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.paginationButton, isFirstPage && styles.disabledButton]}
        disabled={isFirstPage}
        onPress={() => setPage(page - 1)}>
        <Text style={styles.paginationButtonText}>{'<'}</Text>
      </TouchableOpacity>
        <View style={styles.pageNumbersContainer}>
          {page > 2 && totalPages > 3 && (
            <>
              <TouchableOpacity
                style={styles.pageNumberContainer}
                onPress={() => setPage(1)}>
                <Text style={styles.pageNumber}>{1}</Text>
              </TouchableOpacity>
              <Text style={styles.ellipsis}>...</Text>
            </>
          )}
          {pageNumbers}
          {page < totalPages - 1 && totalPages > 3 && (
            <>
              <Text style={styles.ellipsis}>...</Text>
              <TouchableOpacity
                style={styles.pageNumberContainer}
                onPress={() => setPage(totalPages)}>
                <Text style={styles.pageNumber}>{totalPages}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity
        style={[styles.paginationButton, isLastPage && styles.disabledButton]}
        disabled={isLastPage}
        onPress={() => setPage(page + 1)}>
        <Text style={styles.paginationButtonText}>{'>'}</Text>
      </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {data.length === 0 ? renderEmptyData() : renderTableRows()}
      {data.length > 0 && renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({

  // View
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    top: 35,
  },
  ellipsis: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    marginTop: 18,
  },
  cell1: {
    color: '#00358C',
    width: windowWidth * 0.95 * 0.23,
    position: 'absolute',
    textAlign: 'center',
    right: 85
  },
  cell2: {
    color: '#00358C',
    width: windowWidth * 0.95 * 0.17,
    position: 'absolute',
    textAlign: 'center',
    right: 17
  },
  cell3: {
    color: '#00358C',
    width: windowWidth * 0.95 * 0.17,
    position: 'absolute',
    textAlign: 'center',
    right: -71
  },
  cell4: {
    color: '#00358C',
    width: windowWidth * 0.95 * 0.17,
    position: 'absolute',
    right: -160,
    textAlign: 'center'
  },

  // Phân trang
  paginationContainer: {
    position: 'absolute',
    top: windowHeight * 0.245,
    right: -170,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  paginationButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
  paginationButtonText: {
    color: 'gray',
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageNumberContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  pageNumber: {
    justifyContent: 'center',
    color: '#336CC8',
  },
  activePageNumberContainer: {
    backgroundColor: '#336CC8',
    borderRadius: 5,
  },
  activePage: {
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  emptyDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -22
  },

  emptyDataText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default YourComponent;