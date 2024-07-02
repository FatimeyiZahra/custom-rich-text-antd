import React, { useRef, useEffect, useState } from "react";
import { Button, Card, Tooltip, Space } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./customRichTextEditor.css";

const CustomRichTextEditor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(value);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    if (editorRef.current && htmlContent !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      editorRef.current.innerHTML = htmlContent;

      if (range) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [htmlContent]);

  const handleInput = () => {
    const newContent = editorRef.current.innerHTML;
    setHtmlContent(newContent);
    if (onChange) {
      onChange(newContent); // Pass only the new content
    }
    updateButtonStates();
  };

  const applyFormatting = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      handleInput(); // Ensure the state is updated after formatting
    }
  };

  const updateButtonStates = () => {
    if (editorRef.current) {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
      setIsOrderedList(document.queryCommandState("insertOrderedList"));
      setIsUnorderedList(document.queryCommandState("insertUnorderedList"));
    }
  };

  const getButtonStyle = (isActive, isHovered) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    marginRight: "8px",
    borderRadius: "4px",
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    color: isActive || isHovered ? "#06c" : "#000",
  });

  return (
    <>
      <div className="toolbar">
        <Space>
          <Tooltip title="Bold">
            <Button
              icon={<BoldOutlined />}
              onClick={() => applyFormatting("bold")}
              type={isBold ? "primary" : "default"}
              onMouseEnter={() => setHoveredButton("bold")}
              onMouseLeave={() => setHoveredButton(null)}
              style={getButtonStyle(isBold, hoveredButton === "bold")}
            />
          </Tooltip>
          <Tooltip title="Italic">
            <Button
              icon={<ItalicOutlined />}
              onClick={() => applyFormatting("italic")}
              type={isItalic ? "primary" : "default"}
              onMouseEnter={() => setHoveredButton("italic")}
              onMouseLeave={() => setHoveredButton(null)}
              style={getButtonStyle(isItalic, hoveredButton === "italic")}
            />
          </Tooltip>
          <Tooltip title="Underline">
            <Button
              icon={<UnderlineOutlined />}
              onClick={() => applyFormatting("underline")}
              type={isUnderline ? "primary" : "default"}
              onMouseEnter={() => setHoveredButton("underline")}
              onMouseLeave={() => setHoveredButton(null)}
              style={getButtonStyle(isUnderline, hoveredButton === "underline")}
            />
          </Tooltip>
          <Tooltip title="Ordered List">
            <Button
              icon={<OrderedListOutlined />}
              onClick={() => applyFormatting("insertOrderedList")}
              type={isOrderedList ? "primary" : "default"}
              onMouseEnter={() => setHoveredButton("orderedList")}
              onMouseLeave={() => setHoveredButton(null)}
              style={getButtonStyle(
                isOrderedList,
                hoveredButton === "orderedList"
              )}
            />
          </Tooltip>
          <Tooltip title="Unordered List">
            <Button
              icon={<UnorderedListOutlined />}
              onClick={() => applyFormatting("insertUnorderedList")}
              type={isUnorderedList ? "primary" : "default"}
              onMouseEnter={() => setHoveredButton("unorderedList")}
              onMouseLeave={() => setHoveredButton(null)}
              style={getButtonStyle(
                isUnorderedList,
                hoveredButton === "unorderedList"
              )}
            />
          </Tooltip>
        </Space>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onClick={updateButtonStates}
        onKeyUp={updateButtonStates}
        onMouseUp={updateButtonStates}
        className="editor"
        style={{
          minHeight: "110px",
          // marginTop: '10px',
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "0 0 4px 4px",
          outline: "none",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      />
    </>
  );
};

export default CustomRichTextEditor;
