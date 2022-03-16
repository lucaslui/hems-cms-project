import React, { ReactNode } from 'react'

type Props = {children?: ReactNode, value: number, inverted?: boolean}

const Percentage: React.FC<Props> = ({ value, inverted = false }: Props) => {
  const hasIncrease = value >= 0
  const className = !inverted ? (hasIncrease ? 'text-success' : 'text-danger') : (hasIncrease ? 'text-danger' : 'text-success')
  const increaseIcon = <i className="fas fa-arrow-up" />
  const decreaseIcon = <i className="fas fa-arrow-down" />

  return (
        <strong className={className}>
            {hasIncrease ? increaseIcon : decreaseIcon}{Math.abs(value)}%
        </strong>
  )
}

export default Percentage
