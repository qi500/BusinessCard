/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 商品管理item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  // navigation: Navigation;
}

interface State {
}

export default class GoodsManageItem extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100), h(189), bgColor(commonStyles.whiteColor), mt(10)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(16)])}>
          <Image style={styleAssign([w(90), h(90), radiusA(4)])} src={require('../../../assets/ico_default.jpeg')}/>
          <View style={styleAssign([ml(12)])}>
            <Text style={styleAssign([fSize(18), color('#343434')])}>现代简约双人木床</Text>
            <View style={styleAssign([styles.uac, styles.udr, mt(16)])}>
              <Text style={styleAssign([fSize(12), color('#A6A6A6')])}>参考价格：</Text>
              <Text style={styleAssign([fSize(18), color('#FA541C')])}>￥600</Text>
            </View>
            <Text style={styleAssign([fSize(12), color('#A6A6A6'), mt(4)])}>创建时间：2019-11-20</Text>
          </View>
        </View>
        <View
          style={styleAssign([wRatio(95), h(1), {marginLeft: '2.5%'}, bgColor(commonStyles.pageDefaultBackgroundColor), mt(20)])}/>
        {/*底部操作栏*/}
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
          pl(20), pr(20)])}>
          <View style={styleAssign([styles.udr, styles.uac])}>
            {/*更多*/}
            <TouchableButton
              customStyle={styleAssign([w(52), h(28), radiusA(4), bo(1), bdColor(commonStyles.colorTheme),
                {borderStyle: 'solid'}, styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(12), color('#343434')])}>更多</Text>
            </TouchableButton>
            {/*下架商品*/}
            <TouchableButton
              customStyle={styleAssign([ml(32), w(72), h(28), radiusA(4), bo(1), bdColor(commonStyles.colorTheme),
                {borderStyle: 'solid'}, styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(12), color('#343434')])}>下架商品</Text>
            </TouchableButton>
          </View>
          {/*是否展示操作*/}
          <TouchableButton
            customStyle={styleAssign([w(72), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>取消展示</Text>
          </TouchableButton>
        </View>
      </View>
    );
  }
}