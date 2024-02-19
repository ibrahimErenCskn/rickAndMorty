import React, { useRef, useState } from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
const { height, width } = Dimensions.get('window');
const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

interface PaginationComponentProps {
    renderItem: any
    itemData: []
    customHeight?: number
}

export default function PaginationComponent({ renderItem, itemData, customHeight }: PaginationComponentProps) {
    let flatListRef = useRef<any | null>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState(itemData);
    const [searchText, setSearchText] = useState('');

    const onViewRef = useRef(({ changed }: { changed: any }) => {
        if (changed[0].isViewable) {
            setCurrentIndex(changed[0].index);
        }
    });
    const scrollToIndex = (index: number) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
    };
    const onScrollToIndexFailed = (error: any) => {
        console.log('Kaydırma işlemi başarısız oldu:', error);
    };
    const getItemLayout: any = (data: object, index: number) => {
        return {
            length: width, // Öğenin yüksekliği
            offset: width * index, // Öğenin ofseti
        }
    };
    const searchFunction = (text: any) => {
        setSearchText(text);
        text = text.toLowerCase();
        if (text === "") {
            setData(itemData);
        }
        else {
            let filteredItem: any = itemData?.filter((dataN: any) => (dataN?.name.toLowerCase().startsWith(text)))
            setData(filteredItem);
        }
    }

    return (
        <View style={{ width: width, backgroundColor: '#fff' }}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholderTextColor="black"
                    placeholder="Search "
                    value={searchText}
                    onChangeText={text => searchFunction(text)}
                />
            </View>
            <FlatList
                data={data}
                extraData={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={(ref) => {
                    flatListRef.current = ref;
                }}
                style={{ maxHeight: customHeight ? customHeight : 400 }}
                viewabilityConfig={viewConfigRef}
                onViewableItemsChanged={onViewRef.current}
                onScrollToIndexFailed={onScrollToIndexFailed}
                getItemLayout={getItemLayout}
            />
            <View style={styles.dotView}>
                <View style={{ width: width * .5 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {data.map((_: any, index: number) => (
                            <TouchableOpacity
                                key={index.toString()}
                                style={[
                                    styles.circle,
                                    { backgroundColor: index == currentIndex ? 'black' : 'grey', alignItems: 'center', justifyContent: 'center' },
                                ]}
                                onPress={() => scrollToIndex(index)}
                            >
                                <Text>{index + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dotView: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    circle: {
        width: 30,
        height: 30,
        backgroundColor: 'grey',
        borderRadius: 50,
        marginHorizontal: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchBarContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        width: width * .8,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 6
    },
    listDataContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
