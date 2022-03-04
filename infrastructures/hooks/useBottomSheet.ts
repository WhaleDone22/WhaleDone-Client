import { useRef, useEffect } from 'react';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향 
  };
}

export default function useBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);
  console.log(sheet);
  
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
  });
    
  // Touch Event 핸들러들을 등록
  useEffect(() => {
    // 현재 바텀시트의 위치와 터치 포인트의 위치를 기록
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;

      touchStart.sheetY = sheet.current.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };
    
    // 이전 touchmove와 비교하여 터치 포인트가 
    // 어느 방향으로 진행 중인지와 얼만큼 진행했는지를 계산하고 기록
    // 그 후 바텀시트를 터치 포인트의 진행 만큼 움직임
    const handleTouchMove = (e: TouchEvent) => {
    
    };
    
    // 유저가 터치를 제거했을 때, 시트를 최상단으로 올리거나 
    // 최하단으로 내리는 Snap Animation을 트리거
    // 그 후 터치 기록들을 초기화
    const handleTouchEnd = (e: TouchEvent) => {
    
    };
    
    sheetRef.current.addEventListener('touchstart', handleTouchStart);
    sheetRef.current.addEventListener('touchmove', handleTouchMove);
    sheetRef.current.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      sheetRef.current.removeEventListener('touchstart', handleTouchStart);
      sheetRef.current.removeEventListener('touchmove', handleTouchMove);
      sheetRef.current.removeEventListener('touchend', handleTouchEnd);
    }
  }, [])
    
  return { sheet };
}