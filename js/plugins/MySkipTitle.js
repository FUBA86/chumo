/*:
 * @target MZ
 * @plugindesc 强制跳过标题画面
 * @help 启用后游戏启动直接进入地图，不显示标题画面。
 */

(function() {
    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        SceneManager.goto(Scene_Map);
    };
})();