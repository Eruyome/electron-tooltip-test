#SingleInstance, force

WinGet, winID, ID, Custom Tooltip

Msg := "0x0D"
SendMessage, Msg ,,,, ahk_id %winID%
