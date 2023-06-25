import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import { Divider } from 'ant-design-vue';
import {
  TypePicker,
  ThemeColorPicker,
  SettingFooter,
  SwitchItem,
  SelectItem,
  InputNumberItem,
} from './components';

// import { AppDarkModeToggle } from '/@/components/Application';

import { MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
import { useI18n } from '/@/hooks/web/useI18n';

import { baseHandler } from './handler';

import { HandlerEnum, getMenuTriggerOptions, menuTypeList } from './enum';

import {
  HEADER_PRESET_BG_COLOR_LIST,
  // SIDE_BAR_BG_COLOR_LIST,
  // APP_PRESET_COLOR_LIST,
} from '/@/settings/designSetting';

const { t } = useI18n();

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const {
      getGrayMode,
      getLockTime,
      // getThemeColor,
    } = useRootSetting();

    const {
      getIsHorizontal,
      getShowMenu,
      getMenuType,
      getTrigger,
      getCollapsedShowTitle,
      getCollapsed,
      getSplit,
      getIsMixSidebar,
      getMixSideFixed,
    } = useMenuSetting();

    const { getHeaderBgColor } = useHeaderSetting();

    const { getShowMultipleTab } = useMultipleTabSetting();

    const getShowMenuRef = computed(() => {
      return unref(getShowMenu) && !unref(getIsHorizontal);
    });

    function renderSidebar() {
      return (
        <>
          <TypePicker
            menuTypeList={menuTypeList}
            handler={(item: (typeof menuTypeList)[0]) => {
              baseHandler(HandlerEnum.CHANGE_LAYOUT, {
                mode: item.mode,
                type: item.type,
                split: unref(getIsHorizontal) ? false : undefined,
              });
            }}
            def={unref(getMenuType)}
          />
        </>
      );
    }

    function renderHeaderTheme() {
      return (
        <ThemeColorPicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      );
    }

    /**
     * @description:
     */
    function renderFeatures() {
      let triggerDef = unref(getTrigger);

      const triggerOptions = getMenuTriggerOptions(unref(getSplit));
      const some = triggerOptions.some((item) => item.value === triggerDef);
      if (!some) {
        triggerDef = TriggerEnum.FOOTER;
      }

      return (
        <>
          <SwitchItem
            title={t('layout.setting.splitMenu')}
            event={HandlerEnum.MENU_SPLIT}
            def={unref(getSplit)}
            disabled={!unref(getShowMenuRef) || unref(getMenuType) !== MenuTypeEnum.MIX}
          />
          <SwitchItem
            title={t('layout.setting.mixSidebarFixed')}
            event={HandlerEnum.MENU_FIXED_MIX_SIDEBAR}
            def={unref(getMixSideFixed)}
            disabled={!unref(getIsMixSidebar)}
          />

          <SwitchItem
            title={t('layout.setting.menuCollapse')}
            event={HandlerEnum.MENU_COLLAPSED}
            def={unref(getCollapsed)}
            disabled={!unref(getShowMenuRef)}
          />

          <SwitchItem
            title={t('layout.setting.collapseMenuDisplayName')}
            event={HandlerEnum.MENU_COLLAPSED_SHOW_TITLE}
            def={unref(getCollapsedShowTitle)}
            disabled={!unref(getShowMenuRef) || !unref(getCollapsed) || unref(getIsMixSidebar)}
          />
          <SelectItem
            title={t('layout.setting.menuCollapseButton')}
            event={HandlerEnum.MENU_TRIGGER}
            def={triggerDef}
            options={triggerOptions}
            disabled={!unref(getShowMenuRef) || unref(getIsMixSidebar)}
          />
          <InputNumberItem
            title={t('layout.setting.autoScreenLock')}
            min={0}
            event={HandlerEnum.LOCK_TIME}
            defaultValue={unref(getLockTime)}
            formatter={(value: string) => {
              return parseInt(value) === 0
                ? `0(${t('layout.setting.notAutoScreenLock')})`
                : `${value}${t('layout.setting.minute')}`;
            }}
          />
        </>
      );
    }

    function renderContent() {
      return (
        <>
          <SwitchItem
            title={t('layout.setting.tabs')}
            event={HandlerEnum.TABS_SHOW}
            def={unref(getShowMultipleTab)}
          />
          <SwitchItem
            title={t('layout.setting.grayMode')}
            event={HandlerEnum.GRAY_MODE}
            def={unref(getGrayMode)}
          />
        </>
      );
    }

    return () => (
      <BasicDrawer
        {...attrs}
        title={t('layout.setting.drawerTitle')}
        width={330}
        class="setting-drawer"
      >
        <Divider>{() => t('layout.setting.navMode')}</Divider>
        {renderSidebar()}
        <Divider>{() => t('layout.setting.headerTheme')}</Divider>
        {renderHeaderTheme()}
        <Divider>{() => t('layout.setting.interfaceFunction')}</Divider>
        {renderFeatures()}
        <Divider>{() => t('layout.setting.interfaceDisplay')}</Divider>
        {renderContent()}
        <Divider />
        <SettingFooter />
      </BasicDrawer>
    );
  },
});
