export {}
declare global{
    interface window{
        python_ime_typo_fixer_setting:object
    }
    interface extensionSetting{
         isActive:boolean
    }
   var python_ime_typo_fixer_setting:extensionSetting | undefined
}