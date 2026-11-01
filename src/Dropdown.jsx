import { useLayoutEffect, useRef, useState } from 'react';

export default function Dropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    if (!open) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current.getBoundingClientRect().height;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    setUp(menuHeight > spaceBelow && spaceAbove > spaceBelow);
  }, [open]);

  const toggle = () => {
    setOpen((o) => !o);
  };

  return (
    <div className={"dropdown"}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        onClick={toggle}
      >
        {value} ▾
      </button>
      {open && (
        <ul ref={menuRef} className={up ? 'dropdown-menu up' : 'dropdown-menu'}>
          {options.map((v) => (
            <li key={v}>
              <button
                type="button"
                onClick={() => {
                  onChange(v);
                  setOpen(false);
                }}
              >
                {v}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
