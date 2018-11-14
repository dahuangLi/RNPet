const allRules = {
    required: {
        message: '%s不能为空'
    },
    empty: {
        message: ''
    },
    valid_email: {
        regExp: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
        message: '请输入正确的邮箱!'
    },
    valid_mobile: {
        regExp: /^[1][0-9]{10}$/,
        message: '请输入正确的手机号码!'
    },
    valid_mileage: {
        regExp: /^[1-9][0-9]{0,5}$/,
        message: '请输入正确的里程数!'
    },
    valid_unsignedInt: {
        regExp: /^[0-9]+$/,
        message: '%s必须为整数！'
    },
    valid_idcard: {
        regExp: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: '身份证号码不正确!'
    },
    valid_carNumber: {
        regExp: /^[a-zA-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/,
        message: '车牌号不正确!'
    },
    valid_vinNumber: {
        regExp: /^[A-Za-z0-9]{17}$/,
        message: '车架号不正确!'
    },
    valid_engineNumber: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '发动机号不正确!'
    },
    valid_passport: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '护照号码不正确!'
    },
    valid_officerCert: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '军官证号码不正确!'
    },
    valid_socialSecurityCert: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '社保证号码不正确!'
    },
    valid_organizationCode: {
        regExp: /^[A-Za-z0-9]{8}[-]?[A-Za-z0-9]{1}$/,
        message: '组织机构代码不正确!'
    },
    valid_taxRegistrationCert: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '税务登记证号码不正确!'
    },
    valid_enterpriseCode: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '企业代码不正确!'
    },
    valid_legalPersonCert: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '法人证书号码不正确!'
    },
    valid_businessLicense: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '营业执照号码不正确!'
    },
    valid_officerRetirementCert: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '军官退休证号码不正确!'
    },
    valid_taiwanCompatriotCert: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '台胞证号码不正确!'
    },
    valid_internalCode: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '内部编码不正确!'
    },
    valid_HongKongAndMacaoResidentsPassport: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '港澳居民来往内地通行证号码不正确!'
    },
    valid_foreignersPermanentResidenceCert: {
        regExp: /^[A-Za-z0-9]+$/,
        message: '外国人永久居留身份证号码不正确!'
    },
    valid_socialCreditCode: {
        regExp: /^[A-Za-z0-9]{18}$/,
        message: '社会信用代码不正确!'
    },
    max_value: {}
};

const ruleRegex = /^(.+?)\[(.+)\]$/;

export default function validate(data = {}, fields = []) {
    let msg = '';
    fields.some(({
        key,
        name,
        rules = '',
        messages = ''
    }) => {
        let val = data[key];
        rules = rules.split('|');
        messages = messages.split('|');

        const hasRuleDoesNotPass = rules.some((rule, index) => {
            const parts = rule.match(ruleRegex);
            if (parts) {
                rule = parts[1];
                param = parts[2];
            }
            const regExp = allRules[rule].regExp;
            let isRulePass = false;

            switch (rule) {
                case 'empty':
                    isRulePass = true;
                    break;
                case 'required':
                    if (val) {
                        isRulePass = true;
                    }
                    break;
                case 'valid_email':
                case 'valid_mobile':
                case 'valid_mileage':
                case 'valid_carNumber':
                case 'valid_vinNumber':
                case 'valid_engineNumber':
                case 'valid_passport':
                case 'valid_officerCert':
                case 'valid_socialSecurityCert':
                case 'valid_organizationCode':
                case 'valid_taxRegistrationCert':
                case 'valid_enterpriseCode':
                case 'valid_legalPersonCert':
                case 'valid_businessLicense':
                case 'valid_officerRetirementCert':
                case 'valid_taiwanCompatriotCert':
                case 'valid_internalCode':
                case 'valid_HongKongAndMacaoResidentsPassport':
                case 'valid_foreignersPermanentResidenceCert':
                case 'valid_socialCreditCode':
                    val = val + '';
                    if (regExp.test(val)) {
                        isRulePass = true;
                    }
                    break;
                case 'max_value':
                    val = +val;
                    if (val <= +param) {
                        isRulePass = true;
                    }
                    break;
                case 'valid_unsignedInt':
                    if (regExp.test(val)) {
                        isRulePass = true;
                    }
                    break;
                case 'valid_idcard':
                    if (regExp.test(val)) {
                        isRulePass = true;
                    }
                    break;
                default:
                    isRulePass = true;
            }
            let defaultMessage = allRules[rule].message;
            if (rule === 'required' || rule === 'valid_unsignedInt') {
                defaultMessage = defaultMessage.replace('%s', name);
            }
            if (!isRulePass) {
                msg = messages[index] || defaultMessage;
                return true;
            }
        });
        return hasRuleDoesNotPass;
    });

    return msg;
}
