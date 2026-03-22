/*:
 * @target MZ
 * @plugindesc 鼠标悬停在图片上时变成自定义光标
 * @author 你的名字
 * @help 在图片上时变成小手指，离开时恢复默认
 */

(function() {
    // 需要监听的图片编号数组（改成你的立绘编号）
    const targetPictureIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];  // 你的立绘编号是1、2、3
    
    // 光标图片路径（改成你的图片位置）
    const cursorUrl = 'img/system/finger.png';
    
    let isOverTarget = false;
    
    // 创建自定义光标样式
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            cursor: url('${cursorUrl}'), auto !important;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // 监听鼠标移动，检测是否在目标图片上
    const updateCursor = function() {
        const mouseX = TouchInput._mouseX;
        const mouseY = TouchInput._mouseY;
        let overTarget = false;
        
        // 遍历所有目标图片
        for (let id of targetPictureIds) {
            const sprite = SceneManager._scene._spriteset?._pictureContainer?.children.find(
                s => s._picture?._name && s._picture._name !== '' && s._pictureId === id
            );
            if (sprite && sprite.isVisible()) {
                // 获取图片在屏幕上的实际位置和尺寸
                const globalRect = sprite.getGlobalRect();
                if (globalRect.contains(mouseX, mouseY)) {
                    overTarget = true;
                    break;
                }
            }
        }
        
        // 根据是否悬停在目标上，切换body的class
        if (overTarget !== isOverTarget) {
            isOverTarget = overTarget;
            if (overTarget) {
                document.body.classList.add('custom-cursor');
            } else {
                document.body.classList.remove('custom-cursor');
            }
        }
    };
    
    // 每帧检查
    const updateScene = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        updateScene.apply(this, arguments);
        updateCursor();
    };
})();