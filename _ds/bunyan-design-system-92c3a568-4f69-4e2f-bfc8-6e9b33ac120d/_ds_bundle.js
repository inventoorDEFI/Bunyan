/* @ds-bundle: {"format":4,"namespace":"BunyanDesignSystem_92c3a5","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"FloorProgress","sourcePath":"components/data/FloorProgress.jsx"},{"name":"MilestoneList","sourcePath":"components/data/MilestoneList.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"64edd77ae972","components/core/Button.jsx":"a4442b0b38df","components/core/Card.jsx":"7ca7a0fdcc1d","components/core/Icon.jsx":"14062b04dcf8","components/core/IconButton.jsx":"7d7c0dee6e7b","components/core/Logo.jsx":"8d6500eff11e","components/core/Tag.jsx":"2d4c57471a9a","components/data/FloorProgress.jsx":"e70fe53418ba","components/data/MilestoneList.jsx":"bc488e0833f1","components/data/Stat.jsx":"147fdab8e514","components/feedback/Dialog.jsx":"34593fdf37ad","components/feedback/Toast.jsx":"8ab83f9ea06d","components/feedback/Tooltip.jsx":"8fe32086bff4","components/forms/Checkbox.jsx":"a8626f2264e8","components/forms/Input.jsx":"189a8b9591ba","components/forms/Radio.jsx":"0207a327b10b","components/forms/Select.jsx":"d7e44d00a41e","components/forms/Switch.jsx":"4cd50a648e61","components/navigation/BottomNav.jsx":"c8f0a0943a8e","components/navigation/Tabs.jsx":"c1aef195b510","ui_kits/bunyan-build/BuildPartners.jsx":"6eaa4b44b332","ui_kits/bunyan-build/BuildScreens.jsx":"e4e26e497deb","ui_kits/bunyan-invest/InvestPortfolio.jsx":"3c299a9a8940","ui_kits/bunyan-invest/InvestScreens.jsx":"2213cb569f02","ui_kits/shared/Shell.jsx":"6aedb9f67ac0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BunyanDesignSystem_92c3a5 = window.BunyanDesignSystem_92c3a5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const T = {
  success: ['var(--status-success-bg)', 'var(--status-success)'],
  pending: ['var(--status-pending-bg)', 'var(--status-pending)'],
  danger: ['var(--status-danger-bg)', 'var(--status-danger)'],
  neutral: ['var(--status-neutral-bg)', 'var(--status-neutral)'],
  inverse: ['var(--ink-900)', 'var(--white-warm)']
};
function Badge({
  tone = 'neutral',
  dot = true,
  children,
  style,
  ...rest
}) {
  const [bg, fg] = T[tone] || T.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 22,
      paddingInline: 8,
      borderRadius: 'var(--radius-pill)',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      lineHeight: '16px',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...style
    }
  }), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHP() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
function Card({
  variant = 'default',
  padding = 20,
  interactive,
  children,
  style,
  ...rest
}) {
  const [h, p, hp] = useHP();
  const V = {
    default: {
      bg: 'var(--surface-card)',
      bd: 'var(--border-default)'
    },
    tint: {
      bg: 'var(--surface-tint)',
      bd: 'transparent'
    },
    sand: {
      bg: 'var(--surface-sand)',
      bd: 'transparent'
    },
    inverse: {
      bg: 'var(--surface-inverse)',
      bd: 'transparent'
    }
  }[variant] || {};
  return /*#__PURE__*/React.createElement("div", _extends({}, interactive ? hp : {}, rest, {
    style: {
      background: V.bg,
      border: '1px solid ' + (interactive && h ? 'var(--border-strong)' : V.bd),
      borderRadius: 'var(--radius-lg)',
      padding,
      color: variant === 'inverse' ? 'var(--white-warm)' : 'inherit',
      boxShadow: interactive && h ? 'var(--shadow-2)' : 'none',
      cursor: interactive ? 'pointer' : undefined,
      transition: 'box-shadow var(--dur-base) var(--ease-standard),border-color var(--dur-base)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.460.0/icons/';
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style,
  label,
  ...rest
}) {
  const url = 'url(' + CDN + name + '.svg)';
  return /*#__PURE__*/React.createElement("span", _extends({
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true
  }, rest, {
    style: {
      display: 'inline-block',
      flex: 'none',
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMask: url + ' center/contain no-repeat',
      mask: url + ' center/contain no-repeat',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHP() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
const SIZES = {
  sm: {
    h: 'var(--control-h-sm)',
    px: 12,
    fs: 13,
    ic: 16
  },
  md: {
    h: 'var(--control-h-md)',
    px: 18,
    fs: 15,
    ic: 18
  },
  lg: {
    h: 'var(--control-h-lg)',
    px: 24,
    fs: 16,
    ic: 20
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  fullWidth,
  disabled,
  loading,
  children,
  style,
  type = 'button',
  ...rest
}) {
  const [h, p, hp] = useHP();
  const s = SIZES[size] || SIZES.md;
  const V = {
    primary: {
      bg: p ? 'var(--brand-primary-press)' : h ? 'var(--brand-primary-hover)' : 'var(--brand-primary)',
      fg: 'var(--text-on-brand)',
      bd: 'transparent'
    },
    secondary: {
      bg: p ? 'var(--teal-100)' : h ? 'var(--surface-tint)' : 'var(--surface-card)',
      fg: 'var(--teal-700)',
      bd: 'var(--border-strong)'
    },
    ghost: {
      bg: p ? 'var(--teal-100)' : h ? 'var(--surface-tint)' : 'transparent',
      fg: 'var(--teal-700)',
      bd: 'transparent'
    },
    accent: {
      bg: p ? 'var(--sand-700)' : h ? '#A67F3B' : 'var(--sand-500)',
      fg: 'var(--ink-900)',
      bd: 'transparent'
    },
    inverse: {
      bg: p ? 'var(--ink-700)' : h ? '#1A2830' : 'var(--ink-900)',
      fg: 'var(--white-warm)',
      bd: 'transparent'
    },
    danger: {
      bg: p ? '#7F3024' : h ? '#8E3528' : 'var(--brick-600)',
      fg: 'var(--white-warm)',
      bd: 'transparent'
    }
  }[variant] || {};
  const off = disabled || loading;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: off
  }, hp, rest, {
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: s.h,
      paddingInline: s.px,
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + V.bd,
      background: off ? 'var(--surface-sunken)' : V.bg,
      color: off ? 'var(--slate-300)' : V.fg,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 500,
      letterSpacing: '-0.005em',
      cursor: off ? 'not-allowed' : 'pointer',
      transition: 'background var(--dur-fast) var(--ease-standard)',
      whiteSpace: 'nowrap',
      outline: 'none',
      ...style
    }
  }), loading ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "loader-circle",
    size: s.ic,
    style: {
      animation: 'bn-spin 0.9s linear infinite'
    }
  }) : iconStart && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconStart,
    size: s.ic
  }), children, iconEnd && !loading && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd,
    size: s.ic
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHP() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  disabled,
  style,
  ...rest
}) {
  const [h, p, hp] = useHP();
  const d = {
    sm: 32,
    md: 44,
    lg: 52
  }[size] || 44;
  const V = {
    ghost: {
      bg: p ? 'var(--teal-100)' : h ? 'var(--surface-tint)' : 'transparent',
      fg: 'var(--text-secondary)',
      bd: 'transparent'
    },
    secondary: {
      bg: p ? 'var(--teal-100)' : h ? 'var(--surface-tint)' : 'var(--surface-card)',
      fg: 'var(--text-secondary)',
      bd: 'var(--border-default)'
    },
    primary: {
      bg: p ? 'var(--brand-primary-press)' : h ? 'var(--brand-primary-hover)' : 'var(--brand-primary)',
      fg: 'var(--text-on-brand)',
      bd: 'transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled
  }, hp, rest, {
    style: {
      width: d,
      height: d,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + V.bd,
      background: V.bg,
      color: disabled ? 'var(--slate-300)' : V.fg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: 0,
      transition: 'background var(--dur-fast)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 16 : 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Logo({
  variant = 'lockup',
  base = '',
  height = 32,
  style,
  ...rest
}) {
  const f = {
    lockup: 'bunyan-lockup-color.png',
    lockupBlack: 'bunyan-lockup-black.png',
    wordmark: 'bunyan-logo-official.png',
    mark: 'bunyan-mark.svg',
    markMono: 'bunyan-mark-mono.svg',
    markReverse: 'bunyan-mark-reverse.svg',
    appIcon: 'bunyan-mark-tinted.svg'
  }[variant];
  return /*#__PURE__*/React.createElement("img", _extends({
    src: base + 'assets/logo/' + f,
    alt: "Bunyan \u0628\u0646\u064A\u0627\u0646"
  }, rest, {
    style: {
      height,
      width: 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
      alignSelf: 'flex-start',
      flex: 'none',
      display: 'block',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  icon,
  selected,
  onRemove,
  onClick,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 30,
      paddingInline: 10,
      borderRadius: 'var(--radius-sm)',
      border: '1px solid ' + (selected ? 'var(--teal-600)' : 'var(--border-default)'),
      background: selected ? 'var(--surface-tint)' : 'var(--surface-card)',
      color: selected ? 'var(--teal-700)' : 'var(--text-secondary)',
      fontSize: 13,
      fontWeight: selected ? 500 : 400,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }), children, onRemove && /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'inline-flex',
      cursor: 'pointer',
      marginInlineStart: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/FloorProgress.jsx
try { (() => {
function FloorProgress({
  total = 10,
  done = 0,
  current = true,
  orientation = 'vertical',
  size = 'md',
  showLabel = true,
  label,
  style
}) {
  const h = {
    sm: 6,
    md: 10,
    lg: 14
  }[size] || 10;
  const vert = orientation === 'vertical';
  const floors = Array.from({
    length: total
  }, (_, i) => i < done ? 'done' : current && i === done ? 'cur' : 'todo');
  const bg = {
    done: 'var(--teal-600)',
    cur: 'var(--sand-500)',
    todo: 'var(--surface-sunken)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: vert ? 'column' : 'row',
      alignItems: vert ? 'stretch' : 'center',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: vert ? 'column-reverse' : 'row',
      gap: vert ? 3 : 2,
      width: vert ? size === 'sm' ? 40 : size === 'lg' ? 96 : 64 : '100%',
      flex: vert ? undefined : 1
    }
  }, floors.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: vert ? {
      height: h,
      borderRadius: 2,
      background: bg[s],
      border: '1px solid ' + (s === 'todo' ? 'var(--border-default)' : bg[s])
    } : {
      flex: 1,
      height: h,
      borderRadius: 2,
      background: bg[s],
      border: '1px solid ' + (s === 'todo' ? 'var(--border-default)' : bg[s])
    }
  }))), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }
  }, label ?? String(done).padStart(2, '0') + ' / ' + String(total).padStart(2, '0')));
}
Object.assign(__ds_scope, { FloorProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/FloorProgress.jsx", error: String((e && e.message) || e) }); }

// components/data/MilestoneList.jsx
try { (() => {
function MilestoneList({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, items.map((m, i) => {
    const last = i === items.length - 1;
    const c = m.status === 'done' ? 'var(--teal-600)' : m.status === 'current' ? 'var(--sand-500)' : 'var(--border-strong)';
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 20,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 'var(--radius-sm)',
        background: m.status === 'todo' ? 'var(--surface-card)' : c,
        border: '1.5px solid ' + c,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, m.status === 'done' && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 12,
      color: "var(--white-warm)"
    })), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        width: 1.5,
        minHeight: 16,
        background: m.status === 'done' ? 'var(--teal-600)' : 'var(--border-default)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: last ? 0 : 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 500,
        color: m.status === 'todo' ? 'var(--text-muted)' : 'var(--text-primary)'
      }
    }, m.title), m.meta && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, m.meta), m.hash && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--teal-600)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "link-2",
      size: 12
    }), m.hash)));
  }));
}
Object.assign(__ds_scope, { MilestoneList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MilestoneList.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
function Stat({
  label,
  value,
  unit,
  delta,
  size = 'md',
  style
}) {
  const fs = {
    sm: 18,
    md: 24,
    lg: 32
  }[size] || 24;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      lineHeight: '16px',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, unit), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: fs,
      lineHeight: 1.2,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value)), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--teal-600)'
    }
  }, delta));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  sheet,
  contained,
  width = 440
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: contained ? 'absolute' : 'fixed',
      inset: 0,
      background: 'rgba(16,28,36,.45)',
      display: 'flex',
      alignItems: sheet ? 'flex-end' : 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: sheet ? 0 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: sheet ? '100%' : width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: sheet ? '20px 20px 0 0' : 'var(--radius-lg)',
      boxShadow: 'var(--shadow-3)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, sheet && /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'center',
      width: 36,
      height: 4,
      borderRadius: 2,
      background: 'var(--slate-200)',
      marginTop: -12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 19,
      lineHeight: '26px',
      fontWeight: 600
    }
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    size: "sm",
    onClick: onClose,
    style: {
      marginTop: -4,
      marginInlineEnd: -8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: '24px',
      color: 'var(--text-secondary)'
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  tone = 'neutral',
  title,
  children,
  onClose,
  style
}) {
  const ic = {
    success: 'circle-check',
    pending: 'clock',
    danger: 'circle-alert',
    neutral: 'info'
  }[tone];
  const c = {
    success: '#7FC9BF',
    pending: 'var(--sand-500)',
    danger: '#E79A8C',
    neutral: 'var(--slate-300)'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '14px 16px',
      background: 'var(--ink-900)',
      color: 'var(--white-warm)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-3)',
      maxWidth: 420,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 20,
    color: c,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, title), children && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      lineHeight: '20px',
      color: '#C9CFD2'
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      color: '#C9CFD2',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  content,
  children,
  placement = 'top'
}) {
  const [o, setO] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setO(true),
    onMouseLeave: () => setO(false),
    onFocus: () => setO(true),
    onBlur: () => setO(false),
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, children, o && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      [placement === 'top' ? 'bottom' : 'top']: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--ink-900)',
      color: 'var(--white-warm)',
      fontSize: 12,
      lineHeight: '18px',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      zIndex: 50,
      pointerEvents: 'none'
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [v, setV] = React.useState(!!defaultChecked);
  const on = checked ?? v;
  const t = () => {
    if (disabled) return;
    setV(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      t();
    },
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    style: {
      flex: 'none',
      width: 20,
      height: 20,
      marginTop: 2,
      borderRadius: 'var(--radius-sm)',
      border: '1.5px solid ' + (on ? 'var(--teal-600)' : 'var(--border-strong)'),
      background: on ? 'var(--teal-600)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast)'
    }
  }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    color: "var(--white-warm)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-primary)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: '20px'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  id,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: '18px',
      color: error ? 'var(--status-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  mono,
  disabled,
  id,
  style,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  const iid = id || React.useId();
  return /*#__PURE__*/React.createElement(Field, {
    label: label,
    hint: hint,
    error: error,
    id: iid
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 'var(--control-h-md)',
      paddingInline: 12,
      borderRadius: 'var(--radius-md)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: '1px solid ' + (error ? 'var(--status-danger)' : f ? 'var(--border-focus)' : 'var(--border-strong)'),
      boxShadow: f ? 'var(--focus-ring)' : 'none',
      transition: 'box-shadow var(--dur-fast)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: iid,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false)
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 0,
      background: 'transparent',
      fontFamily: mono ? 'var(--font-mono)' : 'inherit',
      fontSize: 15,
      color: 'var(--text-primary)'
    }
  })), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, suffix)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  direction = 'column',
  style
}) {
  const [v, setV] = React.useState(defaultValue);
  const cur = value ?? v;
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: direction,
      gap: direction === 'row' ? 20 : 12,
      ...style
    }
  }, options.map(o => {
    const val = o.value ?? o,
      lab = o.label ?? o,
      on = cur === val;
    return /*#__PURE__*/React.createElement("label", {
      key: val,
      onClick: () => {
        setV(val);
        onChange && onChange(val);
      },
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      role: "radio",
      "aria-checked": on,
      style: {
        flex: 'none',
        width: 20,
        height: 20,
        marginTop: 2,
        borderRadius: 10,
        border: '1.5px solid ' + (on ? 'var(--teal-600)' : 'var(--border-strong)'),
        background: 'var(--surface-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 5,
        background: 'var(--teal-600)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15
      }
    }, lab), o.description && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        lineHeight: '20px'
      }
    }, o.description)));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  id,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: '18px',
      color: error ? 'var(--status-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  id,
  style,
  ...rest
}) {
  const iid = id || React.useId();
  return /*#__PURE__*/React.createElement(Field, {
    label: label,
    hint: hint,
    error: error,
    id: iid
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: iid
  }, rest, {
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 'var(--control-h-md)',
      paddingInline: '12px 36px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (error ? 'var(--status-danger)' : 'var(--border-strong)'),
      background: 'var(--surface-card)',
      fontFamily: 'inherit',
      fontSize: 15,
      color: 'var(--text-primary)',
      outline: 'none',
      ...style
    }
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    color: "var(--text-muted)",
    style: {
      position: 'absolute',
      insetInlineEnd: 12,
      top: 13,
      pointerEvents: 'none'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [v, setV] = React.useState(!!defaultChecked);
  const on = checked ?? v;
  return /*#__PURE__*/React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      if (disabled) return;
      setV(!on);
      onChange && onChange(!on);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    style: {
      width: 40,
      height: 24,
      borderRadius: 12,
      background: on ? 'var(--teal-600)' : 'var(--slate-200)',
      position: 'relative',
      transition: 'background var(--dur-base) var(--ease-standard)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      insetInlineStart: on ? 19 : 3,
      width: 18,
      height: 18,
      borderRadius: 9,
      background: 'var(--white-warm)',
      boxShadow: 'var(--shadow-1)',
      transition: 'inset-inline-start var(--dur-base) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
function BottomNav({
  items = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border-default)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      ...style
    }
  }, items.map(it => {
    const on = value === it.value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        flex: 1,
        height: 60,
        border: 0,
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        color: on ? 'var(--teal-600)' : 'var(--text-muted)',
        cursor: 'pointer',
        fontFamily: 'inherit'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 22
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: on ? 600 : 400
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  style
}) {
  const [v, setV] = React.useState(defaultValue ?? (tabs[0] && (tabs[0].value ?? tabs[0])));
  const cur = value ?? v;
  const seg = variant === 'segmented';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: seg ? 2 : 20,
      padding: seg ? 3 : 0,
      background: seg ? 'var(--surface-sunken)' : 'transparent',
      borderRadius: seg ? 'var(--radius-md)' : 0,
      borderBottom: seg ? 'none' : '1px solid var(--border-default)',
      ...style
    }
  }, tabs.map(t => {
    const val = t.value ?? t,
      lab = t.label ?? t,
      on = cur === val;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      role: "tab",
      "aria-selected": on,
      onClick: () => {
        setV(val);
        onChange && onChange(val);
      },
      style: seg ? {
        flex: 1,
        height: 36,
        border: 0,
        borderRadius: 6,
        background: on ? 'var(--surface-card)' : 'transparent',
        boxShadow: on ? 'var(--shadow-1)' : 'none',
        color: on ? 'var(--text-primary)' : 'var(--text-muted)',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer'
      } : {
        height: 44,
        padding: 0,
        border: 0,
        background: 'transparent',
        borderBottom: '2px solid ' + (on ? 'var(--teal-600)' : 'transparent'),
        marginBottom: -1,
        color: on ? 'var(--text-primary)' : 'var(--text-muted)',
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: on ? 600 : 400,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, lab, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)'
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bunyan-build/BuildPartners.jsx
try { (() => {
(() => {
  const {
    Button,
    Icon,
    Badge,
    Tag,
    Card,
    Dialog,
    Checkbox,
    Switch,
    Tabs
  } = window.BunyanDesignSystem_92c3a5;
  const PARTNERS = [{
    en: 'Riyadh Capital Real Estate Fund',
    ar: 'صندوق الرياض المالية العقاري',
    type: 'Murabaha',
    tAr: 'مرابحة',
    amt: '25–45M',
    st: 'pending',
    new: true
  }, {
    en: 'Alinma Development Partners',
    ar: 'الإنماء لشركاء التطوير',
    type: 'Musharakah',
    tAr: 'مشاركة',
    amt: '30–60M',
    st: 'neutral',
    new: true
  }, {
    en: 'Jadwa Income Fund II',
    ar: 'صندوق جدوى للدخل ٢',
    type: 'Ijarah',
    tAr: 'إجارة',
    amt: '15–40M',
    st: 'success'
  }];
  function BuildPartners({
    onShare
  }) {
    const t = useT();
    const [sel, setSel] = React.useState(null);
    const [shared, setShared] = React.useState({
      2: true
    });
    const p = sel != null ? PARTNERS[sel] : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        lineHeight: '22px',
        color: 'var(--text-secondary)'
      }
    }, t('Licensed partners who asked to review Al Yasmin Residences. You decide who sees your data room.', 'شركاء مرخّصون طلبوا مراجعة مساكن الياسمين. أنت من يقرّر من يطّلع على غرفة البيانات.')), PARTNERS.map((x, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      padding: 16,
      interactive: true,
      onClick: () => setSel(i)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-tint)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "landmark",
      color: "var(--teal-700)"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        lineHeight: '22px'
      }
    }, t(x.en, x.ar)), /*#__PURE__*/React.createElement("div", {
      className: "bn-mono",
      style: {
        color: 'var(--text-muted)'
      }
    }, "SAR ", x.amt))), x.new && !shared[i] && /*#__PURE__*/React.createElement(Badge, {
      tone: "pending",
      dot: false
    }, t('New', 'جديد'))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      icon: "shield-check"
    }, t('CMA-licensed', 'مرخّص')), /*#__PURE__*/React.createElement(Tag, null, t(x.type, x.tAr)), shared[i] && /*#__PURE__*/React.createElement(Badge, {
      tone: "success"
    }, t('Data room shared', 'تمت المشاركة')))))), /*#__PURE__*/React.createElement(Dialog, {
      contained: true,
      open: p != null,
      sheet: true,
      title: p ? t(p.en, p.ar) : '',
      onClose: () => setSel(null),
      actions: /*#__PURE__*/React.createElement(Button, {
        fullWidth: true,
        size: "lg",
        disabled: shared[sel],
        onClick: () => {
          setShared(s => ({
            ...s,
            [sel]: true
          }));
          setSel(null);
          onShare();
        }
      }, shared[sel] ? t('Already shared', 'تمت المشاركة') : t('Share data room', 'مشاركة غرفة البيانات'))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", null, t('They will see the documents below. Access is logged and can be revoked.', 'سيطّلعون على المستندات أدناه. يُسجَّل الوصول ويمكن إلغاؤه.')), /*#__PURE__*/React.createElement(Checkbox, {
      label: t('Title deed & permits', 'الصك والتراخيص'),
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Checkbox, {
      label: t('Drawings & contractor agreement', 'المخططات وعقد المقاول'),
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Checkbox, {
      label: t('Financial statements', 'القوائم المالية')
    }))));
  }
  function BuildAccount({
    lang,
    setLang
  }) {
    const t = useT();
    return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Card, {
      padding: 16
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 22,
        background: 'var(--sand-50)',
        color: 'var(--sand-700)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600
      }
    }, t('FA', 'ف')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, t('Faisal Al-Otaibi', 'فيصل العتيبي')), /*#__PURE__*/React.createElement("div", {
      className: "bn-mono",
      style: {
        color: 'var(--text-muted)'
      }
    }, "CR 1010 482 117")))), /*#__PURE__*/React.createElement(SectionLabel, null, t('Language', 'اللغة')), /*#__PURE__*/React.createElement(Tabs, {
      variant: "segmented",
      value: lang,
      onChange: setLang,
      tabs: [{
        value: 'ar',
        label: 'العربية'
      }, {
        value: 'en',
        label: 'English'
      }]
    }), /*#__PURE__*/React.createElement(SectionLabel, null, t('Notifications', 'الإشعارات')), /*#__PURE__*/React.createElement(Card, {
      padding: 16
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      label: t('Partner requests', 'طلبات الشركاء'),
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Switch, {
      label: t('Review updates', 'تحديثات المراجعة'),
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Switch, {
      label: t('Weekly summary', 'ملخص أسبوعي')
    }))), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconStart: "log-out"
    }, t('Sign out', 'تسجيل الخروج')));
  }
  Object.assign(window, {
    BuildPartners,
    BuildAccount
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bunyan-build/BuildPartners.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bunyan-build/BuildScreens.jsx
try { (() => {
(() => {
  const {
    Button,
    Icon,
    Badge,
    Tag,
    Card,
    Logo,
    Input,
    Tabs,
    FloorProgress,
    Stat,
    Checkbox
  } = window.BunyanDesignSystem_92c3a5;
  function BuildSignIn({
    onDone
  }) {
    const t = useT();
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      base: "../../",
      height: 34,
      style: {
        marginTop: 24
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "bn-crenel",
      style: {
        width: 84
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "bn-label"
    }, "Bunyan Build"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 28,
        lineHeight: t('36px', '44px'),
        fontWeight: 600,
        letterSpacing: 'var(--ls-tight)'
      }
    }, t('Get your project ready for licensed capital.', 'جهّز مشروعك لرأس المال المرخّص.')), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 15,
        lineHeight: '24px',
        color: 'var(--text-secondary)'
      }
    }, t('Sign in with your company details to continue your readiness file.', 'سجّل الدخول ببيانات منشأتك لمتابعة ملف الجاهزية.'))), /*#__PURE__*/React.createElement(Input, {
      label: t('Commercial registration no.', 'رقم السجل التجاري'),
      mono: true,
      defaultValue: "1010 482 117",
      icon: "building-2"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      fullWidth: true,
      iconStart: "fingerprint",
      onClick: onDone
    }, t('Continue with Nafath', 'المتابعة عبر نفاذ')), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 12,
        lineHeight: '18px',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }
    }, t('Bunyan works with capital partners licensed by the Capital Market Authority.', 'تعمل بنيان مع شركاء رأس مال مرخّصين من هيئة السوق المالية.')));
  }
  function BuildHome({
    go
  }) {
    const t = useT();
    return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "bn-label"
    }, t('Al Mada Development Co.', 'شركة المدى للتطوير')), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 24,
        lineHeight: '32px',
        fontWeight: 600
      }
    }, t('Good morning, Faisal', 'صباح الخير، فيصل'))), /*#__PURE__*/React.createElement(Card, {
      padding: 18,
      interactive: true,
      onClick: () => go('docs')
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(FloorProgress, {
      total: 6,
      done: 4,
      size: "lg",
      showLabel: false
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "pending"
    }, t('In review', 'قيد المراجعة')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 600,
        lineHeight: '24px'
      }
    }, t('Al Yasmin Residences', 'مساكن الياسمين')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, t('Riyadh · 48 units · 12 floors', 'الرياض · ٤٨ وحدة · ١٢ طابقًا')), /*#__PURE__*/React.createElement("div", {
      className: "bn-mono",
      style: {
        color: 'var(--text-secondary)'
      }
    }, t('Readiness 4 / 6', 'الجاهزية ٤ / ٦'))))), /*#__PURE__*/React.createElement(Card, {
      variant: "sand",
      padding: 16
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file-warning",
      color: "var(--sand-700)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--sand-700)',
        fontSize: 15
      }
    }, t('Next: upload the feasibility study', 'التالي: ارفع دراسة الجدوى')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        lineHeight: '20px',
        color: 'var(--text-secondary)',
        marginTop: 2
      }
    }, t('Required before capital partners can see your file.', 'مطلوبة قبل أن يطّلع شركاء رأس المال على ملفك.')))), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconStart: "upload",
      style: {
        marginTop: 12
      },
      onClick: () => go('docs')
    }, t('Upload', 'رفع'))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Card, {
      padding: 14
    }, /*#__PURE__*/React.createElement(Stat, {
      label: t('Funding sought', 'التمويل المطلوب'),
      unit: "SAR",
      value: "42.5M",
      size: "sm"
    })), /*#__PURE__*/React.createElement(Card, {
      padding: 14,
      interactive: true,
      onClick: () => go('partners')
    }, /*#__PURE__*/React.createElement(Stat, {
      label: t('Partner interest', 'اهتمام الشركاء'),
      value: "3",
      size: "sm",
      delta: t('2 new this week', '٢ جديد هذا الأسبوع')
    }))));
  }
  const DOCS = [{
    en: 'Title deed',
    ar: 'صك الملكية',
    s: 'success',
    f: 'deed_1042.pdf'
  }, {
    en: 'Building permit',
    ar: 'رخصة البناء',
    s: 'success',
    f: 'permit_balady.pdf'
  }, {
    en: 'Architectural drawings',
    ar: 'المخططات المعمارية',
    s: 'success',
    f: 'drawings_rev3.pdf'
  }, {
    en: 'Contractor agreement',
    ar: 'عقد المقاول',
    s: 'success',
    f: 'contract_signed.pdf'
  }, {
    en: 'Feasibility study',
    ar: 'دراسة الجدوى',
    s: 'todo'
  }, {
    en: 'Shariah structure questionnaire',
    ar: 'استبيان الهيكل الشرعي',
    s: 'todo'
  }];
  function BuildDocs({
    onUpload
  }) {
    const t = useT();
    const [docs, setDocs] = React.useState(DOCS);
    const [tab, setTab] = React.useState('all');
    const done = docs.filter(d => d.s !== 'todo').length;
    const up = i => {
      setDocs(ds => ds.map((d, j) => j === i ? {
        ...d,
        s: 'pending',
        f: 'feasibility_v2.pdf'
      } : d));
      onUpload();
    };
    const list = docs.map((d, i) => ({
      ...d,
      i
    })).filter(d => tab === 'all' || (tab === 'todo' ? d.s === 'todo' : d.s !== 'todo'));
    return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(FloorProgress, {
      orientation: "horizontal",
      total: 6,
      done: done,
      style: {
        flex: 1
      },
      label: done + ' / 6'
    })), /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'all',
        label: t('All', 'الكل'),
        count: 6
      }, {
        value: 'todo',
        label: t('Missing', 'ناقص'),
        count: 6 - done
      }, {
        value: 'done',
        label: t('Submitted', 'مرفوع'),
        count: done
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, list.map(d => /*#__PURE__*/React.createElement(Card, {
      key: d.i,
      padding: 14
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-md)',
        background: d.s === 'todo' ? 'var(--surface-sunken)' : 'var(--surface-tint)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: d.s === 'todo' ? 'file-plus' : 'file-check',
      size: 18,
      color: d.s === 'todo' ? 'var(--text-muted)' : 'var(--teal-600)'
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 500
      }
    }, t(d.en, d.ar)), d.f && /*#__PURE__*/React.createElement("div", {
      className: "bn-mono",
      style: {
        color: 'var(--text-muted)',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, d.f)), d.s === 'todo' ? /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      onClick: () => up(d.i)
    }, t('Upload', 'رفع')) : /*#__PURE__*/React.createElement(Badge, {
      tone: d.s
    }, d.s === 'success' ? t('Verified', 'موثّق') : t('In review', 'قيد المراجعة')))))));
  }
  Object.assign(window, {
    BuildSignIn,
    BuildHome,
    BuildDocs
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bunyan-build/BuildScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bunyan-invest/InvestPortfolio.jsx
try { (() => {
(() => {
  const {
    Button,
    Icon,
    Badge,
    Card,
    Dialog,
    Input,
    Checkbox,
    Stat,
    FloorProgress
  } = window.BunyanDesignSystem_92c3a5;
  function InvestSheet({
    p,
    open,
    onClose,
    onConfirm
  }) {
    const t = useT();
    const [amt, setAmt] = React.useState('10,000');
    const [ok, setOk] = React.useState(false);
    const n = parseInt(amt.replace(/\D/g, '')) || 0;
    const min = parseInt(p ? p.min.replace(/\D/g, '') : '0');
    return /*#__PURE__*/React.createElement(Dialog, {
      contained: true,
      open: open,
      sheet: true,
      title: p ? t('Invest in ', 'الاستثمار في ') + t(p.en, p.ar) : '',
      onClose: onClose,
      actions: /*#__PURE__*/React.createElement(Button, {
        variant: "accent",
        size: "lg",
        fullWidth: true,
        disabled: !ok || n < min,
        onClick: () => onConfirm(amt)
      }, t('Confirm SAR ', 'تأكيد ') + amt + t('', ' ريال'))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: t('Amount', 'المبلغ'),
      suffix: "SAR",
      mono: true,
      value: amt,
      onChange: e => setAmt(e.target.value),
      error: n < min ? t('Minimum SAR ', 'الحد الأدنى ') + p.min : undefined,
      hint: t('Paid from your Bunyan wallet', 'يُدفع من محفظتك في بنيان')
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, ['5,000', '10,000', '25,000'].map(v => /*#__PURE__*/React.createElement(Button, {
      key: v,
      size: "sm",
      variant: amt === v ? 'primary' : 'secondary',
      onClick: () => setAmt(v)
    }, v))), /*#__PURE__*/React.createElement(Card, {
      variant: "tint",
      padding: 12
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--teal-700)'
      }
    }, t('Expected profit at maturity', 'الربح المتوقع عند الاستحقاق')), /*#__PURE__*/React.createElement("span", {
      className: "bn-mono",
      style: {
        color: 'var(--teal-700)'
      }
    }, "SAR ", Math.round(n * 0.114 * 2).toLocaleString('en')))), /*#__PURE__*/React.createElement(Checkbox, {
      label: t('I have read the offering memorandum and understand returns are not guaranteed.', 'قرأت مذكرة الطرح وأدرك أن العوائد غير مضمونة.'),
      checked: ok,
      onChange: setOk
    })));
  }
  function InvestPortfolio({
    holdings,
    open
  }) {
    const t = useT();
    return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Card, {
      variant: "inverse",
      padding: 20
    }, /*#__PURE__*/React.createElement("span", {
      className: "bn-label",
      style: {
        color: 'var(--slate-300)'
      }
    }, t('Total invested', 'إجمالي الاستثمار')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 6,
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "bn-mono",
      style: {
        color: 'var(--sand-500)'
      }
    }, "SAR"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 32,
        fontWeight: 600,
        letterSpacing: '-0.02em'
      }
    }, holdings.reduce((a, h) => a + h.n, 0).toLocaleString('en'))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 24,
        marginTop: 14,
        fontSize: 13,
        color: 'var(--slate-300)'
      }
    }, /*#__PURE__*/React.createElement("span", null, holdings.length, " ", t('projects', 'مشاريع')), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#7FC9BF'
      }
    }, t('Exp. profit SAR 3,420', 'الربح المتوقع ٣٬٤٢٠ ريال')))), /*#__PURE__*/React.createElement(SectionLabel, null, t('Holdings', 'استثماراتي')), holdings.map((h, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      padding: 14,
      interactive: true,
      onClick: () => open(h.p)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(FloorProgress, {
      total: h.p.floors,
      done: h.p.done,
      size: "sm",
      showLabel: false,
      current: h.p.done < h.p.floors
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 15
      }
    }, t(h.p.en, h.p.ar)), /*#__PURE__*/React.createElement("div", {
      className: "bn-mono",
      style: {
        color: 'var(--text-muted)'
      }
    }, "SAR ", h.n.toLocaleString('en'), " \xB7 ", t('floor', 'طابق'), " ", h.p.done, "/", h.p.floors)), h.fresh ? /*#__PURE__*/React.createElement(Badge, {
      tone: "pending"
    }, t('Pending', 'معلّق')) : /*#__PURE__*/React.createElement(Badge, {
      tone: "success"
    }, t('Active', 'نشط'))))));
  }
  Object.assign(window, {
    InvestSheet,
    InvestPortfolio
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bunyan-invest/InvestPortfolio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bunyan-invest/InvestScreens.jsx
try { (() => {
(() => {
  const {
    Button,
    Icon,
    Badge,
    Tag,
    Card,
    Tabs,
    FloorProgress,
    Stat,
    MilestoneList,
    Tooltip
  } = window.BunyanDesignSystem_92c3a5;
  const PROJECTS = [{
    id: 'yasmin',
    en: 'Al Yasmin Residences',
    ar: 'مساكن الياسمين',
    cityEn: 'Riyadh · Al Yasmin',
    cityAr: 'الرياض · حي الياسمين',
    typeEn: 'Residential',
    typeAr: 'سكني',
    floors: 12,
    done: 6,
    target: '42.5M',
    raised: '31.2M',
    pct: 73,
    ret: '11.4%',
    term: '24',
    strEn: 'Murabaha',
    strAr: 'مرابحة',
    min: '5,000'
  }, {
    id: 'corniche',
    en: 'Corniche Offices',
    ar: 'مكاتب الكورنيش',
    cityEn: 'Jeddah · Al Shati',
    cityAr: 'جدة · الشاطئ',
    typeEn: 'Commercial',
    typeAr: 'تجاري',
    floors: 8,
    done: 2,
    target: '28.0M',
    raised: '9.8M',
    pct: 35,
    ret: '12.1%',
    term: '30',
    strEn: 'Musharakah',
    strAr: 'مشاركة',
    min: '10,000'
  }, {
    id: 'khobar',
    en: 'Khobar Townhouses',
    ar: 'تاون هاوس الخبر',
    cityEn: 'Khobar · Al Aqrabiyah',
    cityAr: 'الخبر · العقربية',
    typeEn: 'Residential',
    typeAr: 'سكني',
    floors: 4,
    done: 4,
    target: '16.0M',
    raised: '16.0M',
    pct: 100,
    ret: '10.2%',
    term: '18',
    strEn: 'Ijarah',
    strAr: 'إجارة',
    min: '5,000'
  }];
  function Placeholder({
    p,
    h = 148
  }) {
    const t = useT();
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: h,
        background: 'var(--surface-sand)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 14,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "bn-mono",
      style: {
        color: 'var(--sand-700)'
      }
    }, t('Project photo', 'صورة المشروع')), /*#__PURE__*/React.createElement(FloorProgress, {
      total: p.floors,
      done: p.done,
      size: h > 160 ? 'md' : 'sm',
      showLabel: false,
      current: p.done < p.floors
    }));
  }
  function InvestExplore({
    open
  }) {
    const t = useT();
    const [f, setF] = React.useState('all');
    const list = PROJECTS.filter(p => f === 'all' || (f === 'open' ? p.pct < 100 : p.pct === 100));
    return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "bn-label"
    }, "Bunyan Invest"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '2px 0 0',
        fontSize: 24,
        lineHeight: t('32px', '40px'),
        fontWeight: 600
      }
    }, t('Projects open for funding', 'مشاريع متاحة للتمويل'))), /*#__PURE__*/React.createElement(Tabs, {
      variant: "segmented",
      value: f,
      onChange: setF,
      tabs: [{
        value: 'all',
        label: t('All', 'الكل')
      }, {
        value: 'open',
        label: t('Open', 'مفتوحة')
      }, {
        value: 'funded',
        label: t('Funded', 'مكتملة')
      }]
    }), list.map(p => /*#__PURE__*/React.createElement(Card, {
      key: p.id,
      padding: 12,
      interactive: true,
      onClick: () => open(p)
    }, /*#__PURE__*/React.createElement(Placeholder, {
      p: p
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '12px 4px 4px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 600
      }
    }, t(p.en, p.ar)), p.pct === 100 ? /*#__PURE__*/React.createElement(Badge, {
      tone: "success"
    }, t('Funded', 'مكتمل')) : /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      dot: false
    }, t(p.typeEn, p.typeAr))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 14
    }), t(p.cityEn, p.cityAr)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 4,
        background: 'var(--surface-sunken)',
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: p.pct + '%',
        height: '100%',
        background: 'var(--teal-600)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      className: "bn-mono"
    }, /*#__PURE__*/React.createElement("span", null, "SAR ", p.raised, " / ", p.target), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--teal-600)'
      }
    }, t('Exp. ', 'متوقع '), p.ret))))));
  }
  function InvestProject({
    p,
    onInvest
  }) {
    const t = useT();
    const [tab, setTab] = React.useState('progress');
    return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Placeholder, {
      p: p,
      h: 190
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      icon: "shield-check"
    }, t('Shariah approved', 'مجاز شرعيًا')), /*#__PURE__*/React.createElement(Tag, null, t(p.strEn, p.strAr))), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '4px 0 0',
        fontSize: 24,
        lineHeight: t('32px', '40px'),
        fontWeight: 600
      }
    }, t(p.en, p.ar)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, t(p.cityEn, p.cityAr), " \xB7 ", t('Developer: Al Mada Development', 'المطوّر: شركة المدى للتطوير'))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Stat, {
      size: "sm",
      label: t('Target', 'المستهدف'),
      unit: "SAR",
      value: p.target
    }), /*#__PURE__*/React.createElement(Stat, {
      size: "sm",
      label: t('Exp. return', 'العائد المتوقع'),
      value: p.ret
    }), /*#__PURE__*/React.createElement(Stat, {
      size: "sm",
      label: t('Term', 'المدة'),
      value: p.term,
      unit: t('mo', 'شهر')
    })), /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'progress',
        label: t('Progress', 'التقدم')
      }, {
        value: 'docs',
        label: t('Documents', 'المستندات'),
        count: 5
      }]
    }), tab === 'progress' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "link-2",
      size: 16,
      color: "var(--teal-600)"
    }), t('Each milestone is verified by an inspector and anchored on-chain.', 'كل مرحلة يتحقق منها مفتش مرخّص وتُسجَّل على السلسلة.')), /*#__PURE__*/React.createElement(MilestoneList, {
      items: [{
        title: t('Land & permits', 'الأرض والتراخيص'),
        meta: t('Verified 02 Jun 2026', 'تم التحقق ٠٢ يونيو ٢٠٢٦'),
        hash: '0x91be…04a2',
        status: 'done'
      }, {
        title: t('Foundations', 'الأساسات'),
        meta: t('Inspector: S. Al-Qahtani · Tranche 1 released', 'المفتش: س. القحطاني · صرف الدفعة ١'),
        hash: '0x7a3f…c91e',
        status: 'done'
      }, {
        title: t('Floors 1–6', 'الطوابق ١–٦'),
        meta: t('Verified 14 Oct 2026', 'تم التحقق ١٤ أكتوبر ٢٠٢٦'),
        hash: '0x3d0c…88f1',
        status: 'done'
      }, {
        title: t('Floors 7–12', 'الطوابق ٧–١٢'),
        meta: t('In progress · inspection due Jan 2027', 'قيد التنفيذ · الفحص يناير ٢٠٢٧'),
        status: 'current'
      }, {
        title: t('Handover', 'التسليم'),
        status: 'todo'
      }]
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, [[t('Offering memorandum', 'مذكرة الطرح'), 'PDF · 3.1 MB'], [t('Shariah certificate', 'الشهادة الشرعية'), 'PDF · 0.4 MB'], [t('Feasibility study', 'دراسة الجدوى'), 'PDF · 5.8 MB']].map(([n, m]) => /*#__PURE__*/React.createElement(Card, {
      key: n,
      padding: 14
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file-text",
      color: "var(--text-muted)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      className: "bn-mono",
      style: {
        color: 'var(--text-muted)'
      }
    }, m)), /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 18,
      color: "var(--teal-600)"
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        bottom: -20,
        margin: '0 -20px -20px',
        padding: '12px 20px 20px',
        background: 'var(--surface-page)',
        borderTop: '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "lg",
      fullWidth: true,
      disabled: p.pct === 100,
      onClick: onInvest
    }, p.pct === 100 ? t('Fully funded', 'مكتمل التمويل') : t('Invest from SAR ', 'استثمر من ') + p.min + t('', ' ريال'))));
  }
  Object.assign(window, {
    PROJECTS,
    InvestExplore,
    InvestProject
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bunyan-invest/InvestScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shared/Shell.jsx
try { (() => {
(() => {
  const {
    Button,
    IconButton,
    Icon,
    Badge,
    Tag,
    Card,
    Logo,
    Input,
    Select,
    Checkbox,
    Radio,
    Switch,
    Tabs,
    BottomNav,
    Dialog,
    Toast,
    Tooltip,
    FloorProgress,
    Stat,
    MilestoneList
  } = window.BunyanDesignSystem_92c3a5;
  const LangCtx = React.createContext('en');
  function useT() {
    const l = React.useContext(LangCtx);
    return (en, ar) => l === 'ar' ? ar : en;
  }
  function Phone({
    children,
    lang
  }) {
    return /*#__PURE__*/React.createElement("div", {
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      lang: lang,
      style: {
        width: 390,
        height: 844,
        background: 'var(--surface-page)',
        borderRadius: 36,
        border: '10px solid var(--ink-900)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: 'var(--shadow-3)',
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 44,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 24,
        fontSize: 14,
        fontWeight: 600
      },
      dir: "ltr"
    }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "signal",
      size: 16
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi",
      size: 16
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "battery-full",
      size: 16
    }))), children);
  }
  function AppBar({
    title,
    onBack,
    right
  }) {
    const lang = React.useContext(LangCtx);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 56,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        paddingInline: 8,
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--surface-card)'
      }
    }, onBack ? /*#__PURE__*/React.createElement(IconButton, {
      icon: "chevron-left",
      label: "Back",
      onClick: onBack,
      style: {
        transform: lang === 'ar' ? 'scaleX(-1)' : undefined
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        width: 12
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 17,
        fontWeight: 600
      }
    }, title), right);
  }
  function Scroll({
    children,
    pad = 20
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: pad,
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, children);
  }
  function SectionLabel({
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "bn-label",
      style: {
        marginTop: 4
      }
    }, children);
  }
  Object.assign(window, {
    LangCtx,
    useT,
    Phone,
    AppBar,
    Scroll,
    SectionLabel
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shared/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.FloorProgress = __ds_scope.FloorProgress;

__ds_ns.MilestoneList = __ds_scope.MilestoneList;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
