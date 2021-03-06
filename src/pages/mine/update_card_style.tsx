/**
 * @filename update_card_style.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 修改名片样式
*/
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, mt, pl, pr, w, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import HelpNavigationItem from "./component/help-navigation-item/index";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
}

interface State {
}

@connect(state => state.login, {...actions})
class UpdateCardStyle extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {

  }

  constructor(props) {
    super(props);
    console.log(this.viewRef);
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <HelpNavigationItem/>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.whiteColor)])}
          scrollY>
          <View style={styleAssign([styles.uf1, pl(20), pr(20)])}>
            <Text
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极易推，进入“我的”页面，点击“立即选择”，进入“完善名片”，进入“名片完善”页面，点击“编辑”图标，进入“个人信息编辑”页面，再点击“名片样式”一栏，进入“名片样式”页面，选择好样式之后，点击“完成”，即可成功修改名片样式。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_update_card_style_1.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_update_card_style_2.png`}/>
            </View>
          </View>
          <View style={styleAssign([styles.uf1, pl(20), pr(20),mt(20)])}>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_update_card_style_3.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_update_card_style_4.png`}/>
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default UpdateCardStyle;
