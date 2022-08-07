import React, { useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import Tooltip from 'react-native-walkthrough-tooltip';
import { api } from '../../infrastructures/api';
import { Feed, reactionToIcon } from '../../infrastructures/types/feed';
import COLORS from '../styles/colors';

const ImageEmptyProfile = require('../../assets/image-profile-empty.png');
const IcEditBlack = require('../../assets/ic-edit-black.png');
const IcDeleteRed = require('../../assets/ic-delete-red.png');
const IcMore = require('../../assets/ic-more.png');
const IcLine = require('../../assets/ic-moreBtn-line.png');

const modalButtonStyle = {
  width: 139,
  height: 50,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  feed: {
    display: 'flex',
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 17,
    position: 'relative',
  },
  myFeed: {
    flexDirection: 'row-reverse',
  },
  familyFeed: {
    flexDirection: 'row',
  },
  feedBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  selectedMyFeedBubble: {
    borderWidth: 1,
    borderColor: COLORS.BLUE_400,
  },
  selectedFamilyFeedBubble: {
    borderWidth: 1,
    borderColor: COLORS.GREY_050,
  },
  writerText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    fontFamily: 'Pretendard',
    marginLeft: 10,
    marginBottom: 8,
  },
  feedBubble: {
    flexDirection: 'column',
    backgroundColor: COLORS.GREY_020,
    borderRadius: 10,
    marginLeft: 10,
    paddingVertical: 20,
  },
  myFeedBubble: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: COLORS.BLUE_200,
    marginLeft: 0,
    marginRight: 10,
  },
  familyFeedBubble: {
    borderWidth: 1,
    borderColor: COLORS.GREY_030,
  },
  iconsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  feedReactions: {
    flexDirection: 'row',
  },
  feedMoreButton: {
    flexDirection: 'row',
  },
  moreIcon: {
    width: 16,
    height: 16,
    marginVertical: 8,
  },
  reactionBox: {
    flexDirection: 'row',
    marginRight: 10,
    height: 30,
    alignItems: 'center',
  },
  reactionIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  reactionCount: { color: COLORS.TEXT_SECONDARY, fontSize: 12 },
  titleText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 20,
  },
  bodyText: {
    marginTop: 14,
    fontSize: 14,
    fontFamily: 'Pretendard',
    color: 'black',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: 327,
    height: 194,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    position: 'absolute',
  },
  modalTitleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  modalContentText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 25,
  },
  modalButtonWrap: {
    flexDirection: 'row',
  },
  modalWithdrawButton: {
    ...modalButtonStyle,
    // backgroundColor: 'yellow',
    marginRight: 9,
    borderWidth: 1,
    borderColor: COLORS.TEXT_DISABLED_GREY,
  },
  modalActiveButton: {
    ...modalButtonStyle,
    backgroundColor: COLORS.THEME_NEGATIVE,
  },
  modalButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
  },
});

function FeedItem({
  feed,
  isMine,
  setSelectedFeedID,
  selectedFeedID,
  setSelectedFeedY,
  editFeed,
  fetchFeeds,
}: {
  feed: Feed;
  isMine: boolean;
  setSelectedFeedID: () => void;
  selectedFeedID: number | undefined;
  setSelectedFeedY: (y: number) => void;
  editFeed: (
    category: string,
    question: string,
    feedID: number,
    content: string,
    type: string,
  ) => void;
  fetchFeeds: () => void;
}) {
  const [positionY, setPositionY] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [editVisible, setEditVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<string>('');
  const [modalContent, setModalContent] = useState('');
  const [isReported, setIsReported] = useState<boolean>(false);

  const feedViewRef = useRef<View>(null);
  const onBubbleClicked = () => {
    setSelectedFeedID();
    setEditVisible(false);
    if (positionY && height) setSelectedFeedY(positionY + height);
  };

  const onBubbleLongPressed = () => {
    setEditVisible(true);
  };

  const onEditPressed = () => {
    editFeed('수정하기', feed.title, feed.id, feed.body, feed.type);
    setEditVisible(false);
  };

  const onDeletePressed = () => {
    api.feedService.deleteFeed(feed.id).then((response) => {
      if (response.isSuccess) {
        setEditVisible(false);
        fetchFeeds();
      }
    });
  };

  const onMorePressed = (value: string) => {
    setModalVisible(true);
    setModalValue(value);
    if (value === '신고하기') {
      setModalContent(
        '상대방이 업로드한 모든 게시글이 삭제돼요. 신고 후에는 취소할 수 없으니 신중히 사용해 주세요.',
      );
    } else {
      setModalContent(
        '이제 상대방과 더 이상 소통하지 않아요. 차단 후에는 취소할 수 없으니 신중히 사용해 주세요.',
      );
    }
  };

  const onActivePressed = () => {
    setIsReported(!isReported);
    setModalVisible(false);
    Alert.alert(
      '⚠ 신고 접수 안내',
      '서비스 운영정책 위반으로 소통이 임시 제한되었어요. 임시조치 기간동안 다른 서비스는 이용 가능하나 소통 공유는 불가하며 탈퇴에 제한이 있어요.',
      [
        {
          text: '확인',
          // onPress: () => console.log("글이 안보임"),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View
      style={[styles.feed, isMine ? styles.myFeed : styles.familyFeed]}
      onLayout={(event) => {
        const { layout } = event.nativeEvent;
        setPositionY(layout.y);
        setHeight(layout.height);
      }}
      ref={feedViewRef}
    >
      <Image
        source={
          feed.writerThumbnail
            ? { uri: feed.writerThumbnail }
            : ImageEmptyProfile
        }
        style={styles.profileImage}
      />
      <View style={styles.feedBox}>
        {!isMine && <Text style={styles.writerText}>{feed.writer}</Text>}
        <Pressable
          style={[
            styles.feedBubble,
            isMine ? styles.myFeedBubble : styles.familyFeedBubble,
            selectedFeedID === feed.id &&
              (isMine
                ? styles.selectedMyFeedBubble
                : styles.selectedFamilyFeedBubble),
          ]}
          onPress={onBubbleClicked}
          onLongPress={onBubbleLongPressed}
        >
          {isReported && (
            <Text
              style={{ color: COLORS.TEXT_DISABLED_GREY, textAlign: 'center' }}
            >
              신고 접수로 잠시 제한된 글입니다.
            </Text>
          )}
          {!isReported && (
            <View>
              <Text style={styles.titleText}>{feed.title}</Text>
              {feed.type === 'TEXT' && (
                <Text style={styles.bodyText}>{feed.body}</Text>
              )}
              {feed.type === 'IMAGE' && (
                <View style={{ paddingHorizontal: 24 }}>
                  <Image
                    source={{ uri: feed.body }}
                    style={{
                      width: '100%',
                      height: 332,
                      marginTop: 16,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              )}
              <View style={styles.iconsWrap}>
                <View style={styles.feedReactions}>
                  {feed.reactions.map((reaction) => (
                    <Pressable key={reaction.type} style={styles.reactionBox}>
                      <Image
                        source={reactionToIcon[reaction.type]}
                        style={styles.reactionIcon}
                      />
                      <Text style={styles.reactionCount}>{reaction.count}</Text>
                    </Pressable>
                  ))}
                </View>
                <Modal
                  // isVisible Props에 State 값을 물려주어 On/off control
                  isVisible={modalVisible}
                  // 아이폰에서 모달창 동작시 깜박임 해결
                  useNativeDriver
                  hideModalContentWhileAnimating
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitleText}>{modalValue}</Text>
                    <Text style={styles.modalContentText}>{modalContent}</Text>
                    <View style={styles.modalButtonWrap}>
                      <Pressable onPress={() => setModalVisible(false)}>
                        <View style={styles.modalWithdrawButton}>
                          <Text style={styles.modalButtonText}>취소하기</Text>
                        </View>
                      </Pressable>
                      <Pressable onPress={onActivePressed}>
                        <View style={styles.modalActiveButton}>
                          <Text
                            style={[styles.modalButtonText, { color: 'white' }]}
                          >
                            {modalValue}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Menu onSelect={onMorePressed}>
                  <MenuTrigger>
                    <Image source={IcMore} style={styles.moreIcon} />
                  </MenuTrigger>
                  <MenuOptions style={{ padding: 10 }}>
                    <MenuOption value="신고하기" text="글 신고하기" />
                    <MenuOption value={2} disableTouchable>
                      <Image
                        source={IcLine}
                        style={{ width: 168, height: 1, alignItems: 'center' }}
                      />
                    </MenuOption>
                    <MenuOption value="차단하기" text="사용자 차단하기" />
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          )}

          {isMine && editVisible && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.GREY_010,
                bottom: 0,
                marginBottom: -20,
                left: 0,
                width: '100%',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 4,
              }}
            >
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 52,
                  borderBottomColor: COLORS.GREY_030,
                  borderBottomWidth: 1,
                }}
                onPress={onEditPressed}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Pretendard',
                    color: COLORS.TEXT_PRIMARY,
                    paddingLeft: 16,
                  }}
                >
                  수정하기
                </Text>
                <Image
                  source={IcEditBlack}
                  style={{ width: 24, height: 24, marginRight: 16 }}
                />
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 52,
                }}
                onPress={onDeletePressed}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Pretendard',
                    color: COLORS.THEME_NEGATIVE,
                    paddingLeft: 16,
                  }}
                >
                  삭제하기
                </Text>
                <Image
                  source={IcDeleteRed}
                  style={{ width: 24, height: 24, marginRight: 16 }}
                />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default FeedItem;
