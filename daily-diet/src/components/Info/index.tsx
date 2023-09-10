import * as S from './styled'
import { TouchableOpacityProps } from 'react-native'

type InfoProps = TouchableOpacityProps & {
  percentage: string
  type?: S.InfoColorSchemeType
}

export function Info({ percentage, type = 'PRIMARY', ...rest }: InfoProps) {
  return (
    <S.InfoContainer type={type} {...rest}>
      <S.TextWrapper>
        <S.TextPercent>{percentage}</S.TextPercent>

        <S.TextDescription>das refeições dentro da dieta</S.TextDescription>
      </S.TextWrapper>

      <S.InfoIcon type={type} />
    </S.InfoContainer>
  )
}
