import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../utilities/colors'
import Image from '../../components/Image';
import TextComponent from '../../components/TextComponent';
import Input from '../../components/Input';
import Icon, { IconTypes } from '../../components/Icon';
import { fonts } from '../../utilities/fonts';
import { useNavigation } from '@react-navigation/native';
import GIRL from '../../assets/images/girl.jpg'
import GIR from '../../assets/images/home.jpg'

const Home = () => {

  const [search, setSearch] = useState(null)
  const navigation = useNavigation()

  const CATEGORIES = [
    {
      id: 1,
      name: 'Recommended',
    },
    {
      id: 2,
      name: 'Top Rates',
    },
    {
      id: 3,
      name: 'Best Offers',
    },
    {
      id: 4,
      name: 'Most Visited',
    },
  ]



  const renderCategoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ width: 100, backgroundColor: colors.LIGHT_BLUE, margin: 5, padding: 10, borderRadius: 30, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
        <TextComponent text={item?.name} style={{ color: colors?.PRIMARY, fontSize: 10, fontFamily: fonts?.SEMI_BOLD }} />
      </TouchableOpacity>
    )
  }

  const renderHomeItem = ({ item, index }) => {
    return (
      <View style={{ width: 200, gap: 5, backgroundColor: colors.WHITE, elevation: 1, margin: 5, borderRadius: 10, marginHorizontal: 7 }}>
        <Image source={GIR} style={{ width: '100%', height: 130, borderRadius: 10 }} resizeMode='stretch' />
        <View style={{ padding: 10, gap: 3 }}>
          <TextComponent text={'Lorem House'} numberOfLines={1} style={{ color: colors?.BLACK, width: '95%', fontFamily: fonts?.SEMI_BOLD }} />
          <TextComponent text={'$340/Month'} style={{ color: colors?.PRIMARY, fontSize: 11 }} />
          <View style={styles.wide_row}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Icon name='location' type={IconTypes.EvilIcons} size={15} color={colors?.L_GRAY} />
              <TextComponent text={'Avenue west side'} style={{ color: colors?.L_GRAY, fontSize: 11, fontFamily: fonts?.SEMI_BOLD }} />
            </View>
            <TouchableOpacity style={{ backgroundColor: colors.LIGHT_BLUE, paddingVertical: 5, paddingHorizontal: 8, borderRadius: 10 }}>
              <Icon type={IconTypes.FontAwesome} name="bookmark" size={12} color={colors?.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.PRIMARY} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
        <View style={styles.wide_row}>

          <View>
            <TextComponent text={"Let's find your "} style={{ color: colors.L_GRAY, fontSize: 14 }} />
            <TextComponent text={"Favorite Home"} style={{ fontSize: 16, fontFamily: fonts?.BOLD }} />
          </View>
          <TouchableOpacity>
            <Image source={GIRL} style={{ width: 35, height: 35, borderRadius: 100 }} resizeMode='cover' />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

          <Input
            value={search}
            onChangeText={(e) => setSearch(e)}
            placeholder={'Search by address , city or zip code'}
            mainStyle={{ width: '82%' }}
            leftIcon={<Icon name={'search1'} type={IconTypes.AntDesign} size={18} color={colors.L_GRAY} />}

          />

          <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10, backgroundColor: colors.PRIMARY, borderRadius: 10, height: 48, width: 45, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name='filter-sharp' type={IconTypes.Ionicons} size={20} color={colors.WHITE} />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={CATEGORIES}
            horizontal
            renderItem={renderCategoryItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View>
          <FlatList
            data={[1, 2, 3]}
            horizontal
            renderItem={renderHomeItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          />
        </View>

        <View style={[styles.wide_row, { margin: 15 }]}>
          <TextComponent text={'Near You'} style={{ fontFamily: fonts?.BOLD, fontSize: 15 }} />

          <TouchableOpacity>
            <TextComponent text={'More'} style={{ color: colors.L_GRAY, fontSize: 12 , fontFamily: fonts?.SEMI_BOLD}} />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={[1, 2, 3]}
            renderItem={renderCategoryItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ margin: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  wide_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  red_view: {
    backgroundColor: colors.PRIMARY,
    // height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

})  
