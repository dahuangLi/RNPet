import { colors, fill, font, height, icon, spacing } from '../../Styles/Base';

import listItemStyle from 'antd-mobile-rn/lib/list/style';

export const iconSize = icon;

export default {
    ...listItemStyle,
    Header: {
        ...listItemStyle.fontSize,
        fontSize: font.xs,
        color: colors.textDark,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
        backgroundColor: fill.body
    },
    Body: {
        ...listItemStyle.Body,
        borderTopWidth: 0
    },
    BodyBottomLine: {
        ...listItemStyle.BodyBottomLine,
        borderBottomColor: colors.borderBase
    },
    Content: {
        ...listItemStyle.Content,
        color: colors.textDark,
        fontSize: font.md,
        fontWeight: '300'
    },
    Item: {
        ...listItemStyle.Item,
        minHeight: height.listItem
    },
    Extra: {
        ...listItemStyle.Extra,
        color: colors.textDark,
        fontSize: font.md,
        fontWeight: '300'
    },
    Line: {
        ...listItemStyle.Line,
        borderBottomColor: colors.borderLight,
        minHeight: 0,
        height: '100%'
    },
    Thumb: {
        width: iconSize.md,
        height: iconSize.md,
        marginRight: spacing.sm
    }
};
