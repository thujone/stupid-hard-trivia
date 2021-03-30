import Validator from '../validator.js'
const formId = 'generator-form'
const buttonBarQuerySelector = '.DGsettingsType'
const hasNonlinearCurves = true
const validator = new Validator(formId, buttonBarQuerySelector, hasNonlinearCurves)

validator.customConstraints = { 
    isUniqueGeneratorName: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        validationResult.succeeded = !customParams.existingNames.includes(value.toLowerCase())
        validationResult.type = 'IS_UNIQUE_NAME'
        validationResult.errorMessage = validator.MESSAGES.IS_UNIQUE_NAME(value)
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
    validateAge: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const checkAge = ['existingDG', 'existingMoreDG'].includes(validator.formVariant)
        const age = viewModel['DGAge']
        validationResult.succeeded =  !checkAge || (age && Number.isInteger(Number(age)) && Number(age) >= 0 && Number(age) <= 100)
        validationResult.type = 'VALIDATE_AGE'
        validationResult.errorMessage = validator.MESSAGES.VALIDATE_AGE
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
    validateLifetimeAge: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const checkAge = ['existingDG', 'existingMoreDG'].includes(validator.formVariant)
        const age = viewModel['DGAge']
        const lifetime = viewModel['lifetime-DG1']
        validationResult.succeeded =  !checkAge || (Number(age) < Number(lifetime))
        validationResult.type = 'VALIDATE_LIFETIME_AGE'
        validationResult.errorMessage = validator.MESSAGES.VALIDATE_LIFETIME_AGE
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
    validateSize: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const checkExistingSize = ['existingDG', 'existingMoreDG', 'forceDG', 'forceMoreDG'].includes(validator.formVariant)
        const existingSize = viewModel['DGNum']

        validationResult.succeeded =  !checkExistingSize || (existingSize && !isNaN(existingSize) && Number(existingSize) >= 0 && Number(existingSize) <= customParams.maxGenerators)
        validationResult.type = 'VALIDATE_NUMBER_OF_GENERATORS'
        validationResult.errorMessage = validator.MESSAGES.VALIDATE_NUMBER_OF_GENERATORS(validator.getFieldLabel('DGNum'), customParams.maxGenerators)
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
    validateMaxSize: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const checkMaxNewSize = ['considerDG', 'existingMoreDG', 'forceMoreDG'].includes(validator.formVariant)
        const maxNewSize = viewModel['DGMax']

        if (
            !checkMaxNewSize || !maxNewSize || (Number.isInteger(Number(maxNewSize)) && Number(maxNewSize) >= 0 && Number(maxNewSize) <= customParams.maxGenerators)
        )
            validationResult.succeeded = true
        else
            validationResult.succeeded = false

        validationResult.type = 'VALIDATE_MAX_NEW_SIZE_GENERATORS'
        validationResult.errorMessage = validator.MESSAGES.VALIDATE_MAX_NEW_SIZE_GENERATORS(customParams.maxGenerators)
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
    validateMaxSizeForcedInvest: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const maxNewSize = viewModel['DGMax']
        const forcedInvest = viewModel['DGNum']
        const checkConstrainMaxSize = validator.formVariant === 'forceMoreDG'

        if (
            !checkConstrainMaxSize || !maxNewSize || !forcedInvest || parseFloat(maxNewSize) > parseFloat(forcedInvest)
        )
            validationResult.succeeded = true
        else
            validationResult.succeeded = false

        validationResult.type = 'VALIDATE_MAX_SIZE_FORCED_INVEST_GENERATORS'
        validationResult.errorMessage = validator.MESSAGES.VALIDATE_MAX_SIZE_FORCED_INVEST_GENERATORS
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
    sprintCapGTRating: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const sprintHours = parseInt(Number(viewModel['sprintHours-DG1']))
        const sprintCap = Number(viewModel['sprint-DG1'])
        const capacity = Number(viewModel['rating-DG1'])
        validationResult.succeeded = sprintHours === 0 || sprintCap >= capacity
        validationResult.type = 'SPRINT_CAP_GT_RATING'
        validationResult.errorMessage = validator.MESSAGES.SPRINT_CAP_GT_RATING
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
    maxHoursGTMinHours: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const minHours = parseInt(Number(viewModel['MinYearlyHours-DG1']))
        const maxHours = parseInt(Number(viewModel['MaxYearlyHours-DG1']))
        validationResult.succeeded = maxHours >= minHours
        validationResult.type = 'MAX_HOURS_GT_MIN_HOURS'
        validationResult.errorMessage = validator.MESSAGES.MAX_HOURS_GT_MIN_HOURS
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    },
 
    // Compare flat efficiency field to heat-to-power ratio (flat field or HTP curve fields)
    efficiencyHtpRatioFlatFieldOrCurveFields: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const heatToPowerRatio = viewModel['CHPratio-NG1']
        const nameplateEfficiency = value
        const isChpToggled = $('#onoff-CHP').is(':checked')

        const isRecoveryModalOpen = $('#nonLinearCurveModal.htp-curve').is(':visible')
        const hasRecoveryCurve = $('#NonLinearHTPValuesNonLinearCurveButton').is(':visible')

        const efficiencyCurveValueString = document.querySelector('#NonLinearEfficiencyValues').value
        const hasEfficiencyCurve = !([null, ''].includes(efficiencyCurveValueString)) && $('#nonLinearEfficiencyNonLinearCurveButton').is(':visible')

        const areAnyCurveModalsOpen = $('#nonLinearCurveModal').is(':visible')

        // Blank zeroable field can be turned into the number 0
        const heatToPowerRatioNumber = Number(heatToPowerRatio) 
        // A blank wasn't allowed here, seeing as this field was required and > 0
        const nameplateEfficiencyNumber = Number(nameplateEfficiency)

        // Calculate upper Efficiency bound dynamically depending on whether the efficiency value is flat or a curve
        let upperEfficiencyBoundNumber
        // The highest HTP alue in an HTP curve (if it exists)
        let maxHeatToPowerValueNumber
        
        // Because of isRequired and isWithinNumericRange, we can safely assume a valid numeric value exists
        // for `heatToPowerRatioNumber` and is within the proper range (0 <= value <= 100).
        if (!hasRecoveryCurve)
            upperEfficiencyBoundNumber = Number(formatNumber((100 / (heatToPowerRatioNumber + 1)), 3))

        // Else this is an HTP curve and we need to determine the max upper HTP bound
        else {
            const htpValuesString = document.querySelector('#NonLinearHTPValues').value
            const htpValuePairs = htpValuesString.split('*')

            if (htpValuesString === '') {
                maxHeatToPowerValueNumber = .1
                upperEfficiencyBoundNumber = 100
            } else {
                maxHeatToPowerValueNumber = Number(Math.max.apply(Math, htpValuePairs.map(pair => pair.split('#')[1])))
                upperEfficiencyBoundNumber = Number(formatNumber((100 / (maxHeatToPowerValueNumber + 1)), 3))
            }
        }

        console.table('customParams', customParams)

        // Skip the flat-field test if any curve modals are open
        if (areAnyCurveModalsOpen) validationResult.succeeded = true
        // Skip if efficiency curve exists (separate custom rule for curve-on-curve)
        else if (hasEfficiencyCurve) validationResult.succeeded = true
        // Skip because the CHP toggle switch is off
        else if (!isChpToggled) validationResult.succeeded = true
        // For flat HTP value: Skip if the flat HTP value is outside its valid range
        else if (!hasRecoveryCurve && (heatToPowerRatioNumber <= 0 || heatToPowerRatioNumber > 100)) validationResult.succeeded = true
        // For flat HTP value: The actual test that the efficiency is <= its upper bound
        else if (!hasRecoveryCurve && nameplateEfficiencyNumber <= upperEfficiencyBoundNumber) validationResult.succeeded = true
        // For HTP curves that aren't open in their own modal yet: The actual test 
        else if (hasRecoveryCurve && !isRecoveryModalOpen && nameplateEfficiencyNumber <= upperEfficiencyBoundNumber) validationResult.succeeded = true
        // If none of the above fit, then the validation has not succeeded
        else validationResult.succeeded = false

        validationResult.type = 'EFFICIENCY_FLAT_FIELD_HTP_RATIO_FLAT_FIELD_OR_CURVE_FIELDS'
        validationResult.container = customParams.container

        if (!validationResult.succeeded && !hasRecoveryCurve)
            validationResult.errorMessage = validator.MESSAGES.EFFICIENCY_FLAT_FIELD_HTP_RATIO_FLAT_FIELD(upperEfficiencyBoundNumber, heatToPowerRatioNumber)
        else if (!validationResult.succeeded && hasRecoveryCurve)
            validationResult.errorMessage = validator.MESSAGES.EFFICIENCY_FLAT_FIELD_HTP_RATIO_CURVE_FIELDS(upperEfficiencyBoundNumber, maxHeatToPowerValueNumber)
        
        if (validationResult.succeeded) validationResult.relatedFields = ['CHPratio-NG1']
        
        return validationResult
    },

    // Compare efficiency curve fields to the flat heat-to-power ratio
    efficiencyCurveFieldHtpRatio: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const heatToPowerRatio = viewModel['CHPratio-NG1']
        const efficiencyCurveValue = value
        const isChpToggled = $('#onoff-CHP').is(':checked')
        const isEfficiencyModalOpen = $('#nonLinearCurveModal.efficiency-curve').is(':visible')
        const fieldLabel = validator.getFieldLabel(customParams.fieldId)
        const recoveryCurveValueString = document.querySelector('#NonLinearHTPValues').value
        const hasRecoveryCurve = $('#NonLinearHTPValuesNonLinearCurveButton').is(':visible')

        // Blank zeroable field can be turned into the number 0
        const heatToPowerRatioNumber = Number(heatToPowerRatio) 
        // A blank wasn't allowed here, seeing as this field was required and > 0
        const efficiencyCurveValueNumber = Number(efficiencyCurveValue) 

        // Because of isRequired and isWithinNumericRange, we can safely assume a valid numeric value exists
        // for `heatToPowerRatioNumber` and is within the proper range (0 <= value <= 100).
        const upperEfficiencyBoundNumber = Number(formatNumber((100 / (heatToPowerRatioNumber + 1)), 3))

        console.table('customParams', customParams)

        // Skip because the efficiency modal isn't open
        if (!isEfficiencyModalOpen) validationResult.succeeded = true
        // Skip because the CHP toggle switch is off
        else if (!isChpToggled) validationResult.succeeded = true
        // Skip if there is a recovery curve
        else if (hasRecoveryCurve) validationResult.succeeded = true
        // The actual test
        else if (efficiencyCurveValueNumber <= upperEfficiencyBoundNumber) validationResult.succeeded = true
        // If none of the above fit, then the validation has not succeeded
        else validationResult.succeeded = false 

        validationResult.type = 'EFFICIENCY_CURVE_FIELD_HTP_RATIO'
        validationResult.errorMessage = validator.MESSAGES.EFFICIENCY_CURVE_FIELD_HTP_RATIO(fieldLabel, upperEfficiencyBoundNumber, heatToPowerRatioNumber)
        validationResult.container = customParams.container
        return validationResult
    },

    // Compare heat-to-power ratio field to either flat efficiency field or to the efficiency curve values.
    htpRatioEfficiencyFlatFieldOrCurveFields: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const heatToPowerRatio = value
        const nameplateEfficiency = viewModel['NamePlateEff-DG1']
        const isChpToggled = $('#onoff-CHP').is(':checked')

        const isEfficiencyModalOpen = $('#nonLinearCurveModal.efficiency-curve').is(':visible')
        const hasEfficiencyCurve = $('#nonLinearEfficiencyNonLinearCurveButton').is(':visible')
        
        const recoveryCurveValueString = document.querySelector('#NonLinearHTPValues').value
        const hasRecoveryCurve = !([null, ''].includes(recoveryCurveValueString)) && $('#NonLinearHTPValuesNonLinearCurveButton').is(':visible')

        // Blank zeroable field can be turned into the number 0
        const heatToPowerRatioNumber = Number(heatToPowerRatio)
        // A blank wasn't allowed here, seeing as this field was required and > 0
        const nameplateEfficiencyNumber = Number(nameplateEfficiency)

        // Calculate upper HTP bound dynamically depending on whether the efficiency value is flat or a curve
        let upperHtpBoundNumber
        // The highest efficiency % value in an efficiency curve
        let maxEfficiencyValueNumber
        
        // Because of isWithinNumericRange, we can safely assume a valid numeric value exists
        // for `nameplateEfficiencyNumber` and is within the proper range (0 < value <= 100).
        if (!hasEfficiencyCurve)
            upperHtpBoundNumber = Number(formatNumber(((100 / nameplateEfficiencyNumber) - 1), 3))

        // Else this is an efficiency curve and we need to determine the max upper HTP bound
        else {
            const efficiencyValuesString = document.querySelector('#NonLinearEfficiencyValues').value
            const efficiencyValuePairs = efficiencyValuesString.split('*')

            if (efficiencyValuesString === '') {
                maxEfficiencyValueNumber = .1
                upperHtpBoundNumber = 100
            } else {
                maxEfficiencyValueNumber = Number(Math.max.apply(Math, efficiencyValuePairs.map(pair => pair.split('#')[1])))
                upperHtpBoundNumber = Number(formatNumber(((100 / maxEfficiencyValueNumber) - 1), 3))
            }
        }
      
        console.table('customParams', customParams)

        // Skip because we'll run the max efficiency % rule for each curve field INSTEAD of this rule
        // (coming at it from the other angle)
        if (isEfficiencyModalOpen) validationResult.succeeded = true
        // Skip if heat recovery curve exists
        else if (hasRecoveryCurve) validationResult.succeeded = true
        // Skip because the CHP toggle switch is off
        else if (!isChpToggled) validationResult.succeeded = true
        // For flat efficiency value: Skip if the flat efficiency value is outside its valid range
        else if (!hasEfficiencyCurve && (nameplateEfficiencyNumber <= 0 || nameplateEfficiencyNumber > 100)) validationResult.succeeded = true
        // For flat efficiency value: The actual test that the htp-ratio is <= its upper bound
        else if (!hasEfficiencyCurve && heatToPowerRatioNumber <= upperHtpBoundNumber) validationResult.succeeded = true
        // For efficiency curves that aren't open in their own modal yet: The actual test 
        else if (hasEfficiencyCurve && !isEfficiencyModalOpen && heatToPowerRatioNumber <= upperHtpBoundNumber) validationResult.succeeded = true
        // If none of the above fit, then the validation has not succeeded
        else validationResult.succeeded = false

        validationResult.type = 'HTP_RATIO_EFFICIENCY_FLAT_FIELD_OR_CURVE_FIELDS'
        validationResult.container = customParams.container

        if (!validationResult.succeeded && !hasEfficiencyCurve)
            validationResult.errorMessage = validator.MESSAGES.HTP_RATIO_EFFICIENCY_FLAT_FIELD(upperHtpBoundNumber, nameplateEfficiencyNumber)
        else if (!validationResult.succeeded && hasEfficiencyCurve)
            validationResult.errorMessage = validator.MESSAGES.HTP_RATIO_EFFICIENCY_CURVE_FIELDS(upperHtpBoundNumber, maxEfficiencyValueNumber)
        
        if (validationResult.succeeded) validationResult.relatedFields = ['NamePlateEff-DG1']
        return validationResult
    },

    // Compare efficiency curve field to its counterpart in the heat recovery curve
    efficiencyCurveFieldRecoveryCurveField: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const efficiencyCurveValue = value
        const isChpToggled = $('#onoff-CHP').is(':checked')
        const isEfficiencyModalOpen = $('#nonLinearCurveModal.efficiency-curve').is(':visible')
        const recoveryCurveValueString = document.querySelector('#NonLinearHTPValues').value
        const hasRecoveryCurve = !([null, ''].includes(recoveryCurveValueString)) && $('#NonLinearHTPValuesNonLinearCurveButton').is(':visible')
        const recoveryCurveValue = hasRecoveryCurve ? recoveryCurveValueString.split('*')[customParams.columnIndex].split('#')[1] : null
        const fieldLabel = validator.getFieldLabel(customParams.fieldId)

        const efficiencyCurveValueNumber = Number(efficiencyCurveValue)
        const recoveryCurveValueNumber = Number(recoveryCurveValue)

        // Because of isRequired and isWithinNumericRange, we can safely assume a valid numeric value exists
        // for `heatToPowerRatioNumber` and is within the proper range (0 <= value <= 100).
        const upperEfficiencyBoundNumber = Number(formatNumber((100 / (recoveryCurveValueNumber + 1)), 3))

        console.table('customParams', customParams)

        // Skip because the efficiency modal isn't open
        if (!isEfficiencyModalOpen) validationResult.succeeded = true
        // Skip if the recovery curve is empty
        else if (!hasRecoveryCurve) validationResult.succeeded = true
        // Skip because the CHP toggle switch is off
        else if (!isChpToggled) validationResult.succeeded = true
        // The actual test
        else if (efficiencyCurveValueNumber <= upperEfficiencyBoundNumber) validationResult.succeeded = true
        // If none of the above fit, then the validation has not succeeded
        else validationResult.succeeded = false 

        validationResult.type = 'EFFICIENCY_CURVE_FIELD_RECOVERY_CURVE_FIELD'
        validationResult.errorMessage = validator.MESSAGES.EFFICIENCY_CURVE_FIELD_RECOVERY_CURVE_FIELD(fieldLabel, recoveryCurveValue, upperEfficiencyBoundNumber)
        validationResult.container = customParams.container
        return validationResult
    },

    // Compare heat recovery curve field to either the flat efficiency field or to the corresponding column in the efficiency curve
    recoveryCurveFieldEfficiencyFlatFieldOrCurveFields: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const recoveryCurveValue = value
        const nameplateEfficiency = viewModel['NamePlateEff-DG1']
        const nameplateEfficiencyLabel = 'Nameplate Efficiency'
        const isChpToggled = $('#onoff-CHP').is(':checked')
        const isRecoveryModalOpen = $('#nonLinearCurveModal.htp-curve').is(':visible')
        const efficiencyCurveValueString = document.querySelector('#NonLinearEfficiencyValues').value
        const hasEfficiencyCurve = !([null, ''].includes(efficiencyCurveValueString)) && $('#nonLinearEfficiencyNonLinearCurveButton').is(':visible')
        const efficiencyValue = hasEfficiencyCurve ? efficiencyCurveValueString.split('*')[customParams.columnIndex].split('#')[1] : nameplateEfficiency
        const fieldLabel = validator.getFieldLabel(customParams.fieldId)

        const recoveryCurveValueNumber = Number(recoveryCurveValue)
        const efficiencyValueNumber = Number(efficiencyValue)

        // Because of isRequired and isWithinNumericRange, we can safely assume a valid numeric value exists
        // for `efficiencyValueNumber` and is within the proper range (0 <= value <= 100).
        const upperHtpBoundNumber = Number(formatNumber(((100 / efficiencyValueNumber) - 1), 3))

        console.table('customParams', customParams)

        // Skip because the efficiency modal isn't open
        if (!isRecoveryModalOpen) validationResult.succeeded = true
        // Skip because the CHP toggle switch is off
        else if (!isChpToggled) validationResult.succeeded = true
        // Skip the first column, which is hardcoded to zero
        else if (customParams.columnIndex === 0) validationResult.succeeded = true
        // The actual test
        else if (recoveryCurveValueNumber <= upperHtpBoundNumber) validationResult.succeeded = true
        // If none of the above fit, then the validation has not succeeded
        else validationResult.succeeded = false 

        if (!validationResult.succeeded && !hasEfficiencyCurve)
            validationResult.errorMessage = validator.MESSAGES.RECOVERY_CURVE_FIELD_EFFICIENCY_FLAT_FIELD(fieldLabel, upperHtpBoundNumber, efficiencyValueNumber)
        else if (!validationResult.succeeded && hasEfficiencyCurve)
            validationResult.errorMessage = validator.MESSAGES.RECOVERY_CURVE_FIELD_EFFICIENCY_CURVE_FIELD(fieldLabel, efficiencyValue, upperHtpBoundNumber)

        validationResult.type = 'RECOVERY_CURVE_FIELD_EFFICIENCY_CURVE_FIELD'
        validationResult.container = customParams.container
        return validationResult
    },


    nonlinearCurveSequentialUnits: (value, viewModel, customParams) => {
        const validationResult = new window['lc-form-validation'].FieldValidationResult()
        const columnIndex = customParams.columnIndex
        const columnNumeral = columnIndex + 1
        const currentColumnUnits = parseInt(value)
        const previousColumnUnits = columnIndex > 0 ? parseInt(viewModel[`nonlinear-curve-row1-${columnIndex - 1}`]) : null

        validationResult.succeeded = isNaN(previousColumnUnits) ||
            columnIndex === 0 ||
            currentColumnUnits > previousColumnUnits
        validationResult.type = 'NONLINEAR_CURVE_SEQUENTIAL_UNITS'
        validationResult.errorMessage = validator.MESSAGES.NONLINEAR_CURVE_SEQUENTIAL_UNITS(columnNumeral)
        validationResult.relatedFields = customParams.relatedFields
        validationResult.container = customParams.container
        return validationResult
    }
}

validator.constraints = {
    fields: {
        'DGNum': [
            { validator: validator.customConstraints.validateSize, customParams: { maxGenerators, relatedFields: null } },
            { validator: validator.customConstraints.validateMaxSizeForcedInvest, customParams: { relatedFields: ['DGMax'] } }
        ],
        'DGAge': [
            { validator: validator.customConstraints.validateAge, customParams: { relatedFields: null } },
            { validator: validator.customConstraints.validateLifetimeAge, customParams: { relatedFields: ['lifetime-DG1'] } }
        ],
        'DGMax': [
            { validator: validator.customConstraints.validateMaxSize, customParams: { maxGenerators, relatedFields: null } },
            { validator: validator.customConstraints.validateMaxSizeForcedInvest, customParams: { relatedFields: ['DGNum'] } }
        ],
        'DGName1': [
            { validator: Validator.isRequired },
            { validator: validator.baseValidators.maxLength, customParams: { length: 50 } },
            { validator: validator.customConstraints.isUniqueGeneratorName, customParams: { existingNames: existingTechNames, container: '#section-1' } },
            { validator: Validator.isValidName }
        ],
        'rating-DG1': [
            { validator: Validator.isRequired },
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 1, ceiling: 999999999999, inclusiveFloor: true, inclusiveCeiling: true } },
            { validator: validator.customConstraints.sprintCapGTRating, customParams: { container: '#section-2', relatedFields: ['sprint-DG1', 'sprintHours-DG1']} }
        ],
        'NamePlateEff-DG1': [
            { validator: Validator.isRequired },
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 100, inclusiveFloor: false, inclusiveCeiling: true } },
            { validator: validator.customConstraints.efficiencyHtpRatioFlatFieldOrCurveFields, customParams: { container: '#section-4', fieldId: 'NamePlateEff-DG1' } }
        ],
        'CHPratio-NG1': [
            { validator: Validator.isNumeric, customParams: { toggleId: 'CHPratio-NG1' } },
            { validator: Validator.isWithinNumericRange, customParams: { toggleId: 'CHPratio-NG1', floor: 0, ceiling: 100, inclusiveFloor: true, inclusiveCeiling: true } },
            { validator: validator.customConstraints.htpRatioEfficiencyFlatFieldOrCurveFields, customParams: { container: '#section-4', fieldId: 'CHPratio-NG1' } }
        ],
        'onoff-GAS': [],
        'onoff-DGF': [],
        'onoff-FCF': [],
        'onoff-backup': [],
        'onoff-CHP': [],
        'purchase-DG1': [
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 999999999, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'lifetime-DG1': [
            { validator: Validator.isRequired },
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 2, ceiling: 100, inclusiveFloor: true, inclusiveCeiling: true } },
            { validator: validator.customConstraints.validateLifetimeAge, customParams: { relatedFields: ['DGAge'], container: '#lifetime-DG1-group' } }
        ],
        'OMVar-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 999.99999, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'OMFix-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 999999999, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'sprint-DG1': [
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 999999999, inclusiveFloor: true, inclusiveCeiling: true } },
            { validator: validator.customConstraints.sprintCapGTRating, customParams: { container: '#section-4', relatedFields: ['rating-DG1', 'sprintHours-DG1']} }
        ],
        'sprintHours-DG1': [
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 8760, inclusiveFloor: true, inclusiveCeiling: true } },
            { validator: validator.customConstraints.sprintCapGTRating, customParams: { container: '#section-4', relatedFields: ['rating-DG1', 'sprint-DG1']} }
        ],
        'MinLoad-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 100, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'ActivationDemand-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 999999999.99, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'MaxYearlyHours-DG1': [
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 8760, inclusiveFloor: true, inclusiveCeiling: true } },
            { validator: validator.customConstraints.maxHoursGTMinHours, customParams: { container: '#section-4', relatedFields: ['MinYearlyHours-DG1']} }
        ],
        'MinYearlyHours-DG1': [
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 8760, inclusiveFloor: true, inclusiveCeiling: true } },
            { validator: validator.customConstraints.maxHoursGTMinHours, customParams: { container: '#section-4', relatedFields: ['MaxYearlyHours-DG1']} }
        ],
        'RampUp-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 100, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'RampDown-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 100, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'NOX-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 999.99999, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'NOXFee-DG1': [
            { validator: Validator.isNumeric },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0.00, ceiling: 999999999.99, inclusiveFloor: true, inclusiveCeiling: true } }
        ],
        'MinUpDownTime-DG1': [
            { validator: Validator.isInteger },
            { validator: Validator.isWithinNumericRange, customParams: { floor: 0, ceiling: 23, inclusiveFloor: true, inclusiveCeiling: true } }
        ]
    },

    containers: {
      // Defined programatically below...
    }
}

// Add "containers" selectors to help control tooltip placement
Object.keys(validator.constraints.fields).forEach(key => {
  validator.constraints.containers[key] = `#${key}-group`
})

validator.noConstraints = [
    'singularPriceNonLinearCurveButton',
    'nonLinearPriceNonLinearCurveButton',
    'singularEfficiencyNonLinearCurveButton',
    'nonLinearEfficiencyNonLinearCurveButton',
    'TemperatureDeratingCurve',
    'singularHTPNonLinearCurveButton',
    'NonLinearHTPValuesNonLinearCurveButton',
    'considerDG',
    'existingDG',
    'existingMoreDG',
    'forceDG',
    'forceMoreDG',
    'onoff-GAS',
    'optionExport-label',
    'CHPonoffswitch-label',
    'backuponoffswitch-label',
    'FConoffswitch-label',
    'DGFonoffswitch-label',
    'GASonoffswitch-label',
    'btnManageDGCatalog',
    'gen-save-as',
    'gen-catalog'
]

validator.disposeButtons = [
    '#generatorTech-cancel',
    '.close-node-window',
    '#deleteGen'
]

validator.initialize()
