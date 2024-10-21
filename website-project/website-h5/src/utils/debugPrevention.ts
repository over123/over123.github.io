// 禁止调试和禁用 F12 键的功能
export const preventDebugging = () => {
  // 禁用右键菜单
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 禁用 F12 键
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
      redirectToBlankPage();
    }
  });

  // 禁用开发者工具快捷键
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
      redirectToBlankPage();
    }
  });

  // 检测开发者工具的打开
  const devToolsCheck = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    if (widthThreshold || heightThreshold) {
      redirectToBlankPage();
    }
  };

  setInterval(devToolsCheck, 1000);

  // 禁用控制台
  (function() {
    try {
      var $_console$$ = console;
      Object.defineProperty(window, "console", {
        get: function() {
          if ($_console$$._commandLineAPI) {
            redirectToBlankPage();
          }
          return $_console$$;
        },
        set: function(val) {
          $_console$$ = val;
        }
      });
    } catch (e) {}
  })();
};

// 跳转到空白页面
function redirectToBlankPage() {
  window.location.href = 'about:blank';
}