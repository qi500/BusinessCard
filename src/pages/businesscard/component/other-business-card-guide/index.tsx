/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 别人名片指引页
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../../utils/datatool";
import {
  absL,
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  ml,
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../../../utils/style";
import TouchableButton from "../../../../compoments/touchable-button/index";


interface Props {
  cancle: any;
  goToMyCard: any;
}

interface State {
}

export default class OtherBusinessCardGuide extends PureComponent<Props, State> {

  render() {

    let {cancle, goToMyCard} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View
          style={styleAssign([wRatio(100), styles.uac, styles.upa, absT(0)])}>
          <Image style={styleAssign([w(97), h(34), styles.upa, absT(iphoneX() ? 46 : 26), absL(20)])}
                 src={require('../../../../assets/guide_person.png')}
                 onClick={goToMyCard}/>
          <Text
            style={styleAssign([w(170), h(50), ml(20), fSize(18), mt(150), color(commonStyles.whiteColor)])}>点击这里可以回到自\n己的名片首页哦！</Text>
          <View
            onClick={cancle}
            style={styleAssign([styles.uac, styles.ujc, w(120), h(44), radiusA(22), bo(1), bdColor(commonStyles.whiteColor), {borderStyle: 'solid'},
              bgColor('rgb(145,145,145)'), mt(40)])}>
            <Text style={styleAssign([color(commonStyles.whiteColor), fSize(18)])}>我知道了</Text>
          </View>
          <Image style={styleAssign([w(92), h(87), styles.upa, absL(40), absT(90)])}
                 src={require('../../../../assets/guide_line4.png')}/>
        </View>
      </View>
    );
  }
}
