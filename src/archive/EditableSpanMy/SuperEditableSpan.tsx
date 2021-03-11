import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from "react";
import SvgPen from "./SvgPen";
import {InputText} from "../InputText/InputText";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string

    spanProps?: DefaultSpanPropsType // пропсы для спана
};

export const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus, // игнорировать изменение этого пропса
        onBlur,
        onEnter,
        spanProps,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {};

    const onEnterCallback = () => {
        setEditMode(false); // выключить editMode при нажатии Enter

        onEnter && onEnter();
    };
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false); // выключить editMode при нажатии за пределами инпута

        onBlur && onBlur(e);
    };
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true); // включить editMode при двойном клике

        onDoubleClick && onDoubleClick(e);
    };

    // const spanClassName = `${"сделать красивый стиль для спана"} ${className}`; //
    // Стиль сделал при навидении будет отображаться карандашь.
    // А понять можно ли редактировать текст, можно только в контексте использовантя данного компонента.
    //

    return (
        <>
            {editMode
                ? (
                    <InputText
                        autoFocus // пропсу с булевым значением не обязательно указывать true
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}

                        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    />
                ) : (
                    <div>
                        <span
                            onDoubleClick={onDoubleClickCallBack}
                            {...restSpanProps}
                        >
                            {children || restProps.value}
                        </span>
                        <SvgPen/>
                    </div>
                )
            }
        </>
    );
}




