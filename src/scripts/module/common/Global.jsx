const Global = {
    Const: {
        Event_DataLoading: "dataLoading",
        Event_UIChange: "uiChange",
        Event_ModuleChange: "moduleChange",
        Event_DashboardChange: "dashboardChange",

        Key_DataLoading_Finish: "Finish",
        Key_DataLoading_Doing: "Doing",

        Key_UIChange_Loading: "Loading",
        Key_UIChange_GuestEnter: "GuestEnter",
        Key_UIChange_AdminLogin: "AdminLogin",
        Key_UIChange_RootLogin: "RootLogin",
        Key_UIChange_AdminLogout: "AdminLogout",
        Key_UIChange_RootResetPassword: "RootResetPassword",
        Key_UIChange_Lock: "Lock",
        Key_UIChange_Index: "Index",

        Key_ModuleChange_Dashboard: "Dashboard",
        Key_ModuleChange_Alarm: "Alarm",
        Key_ModuleChange_Configuration: "Configuration",

        LocalStorageKey_UserName: 'user.name',

        Value_User_Guest: "guest",
        Value_User_Admin: "admin",
        Value_User_Root: "root",
    },
    Status: {
        UserName: undefined,
        UserPassword: undefined,
        UserLoginToken: undefined,

        RefreshThreadInterval: 1000,
    }

}

export default Global;