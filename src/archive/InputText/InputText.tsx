import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react";
import s from "./InputText.module.scss";
import styled from "styled-components";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
};

export const InputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }

    return (
        <div>
            <InputL
                type={"text"}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                error={error}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <ErrorWrapper error={error}>
                {error && <ErrorSpanL>{error}</ErrorSpanL>}
            </ErrorWrapper>
        </div>
    );
}


const InputL = styled.input<any>`
  width: 300px;
  padding: .5rem 1rem;
`

const ErrorWrapper = styled.div<any>`
  padding-top: ${props => props.error ? '10px' : '0px'};
  width: ${props => props.error ? '300px' : '0px'};
`

const ErrorSpanL = styled.span<any>`
  color: ${({theme}) => theme.color.red};
`