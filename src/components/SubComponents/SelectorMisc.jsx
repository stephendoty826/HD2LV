import React from 'react'

export const MoreInfoJSX = ({selected}) => {
  return <>{selected["more info"] && (
      <div className="pt-1">
        <a href={selected["more info"]} target="_blank" rel="noreferrer">MORE INFO</a>
      </div>
    )}
  </>
} 

export const ImageCreditJSX = ({selected}) => {
  return  <>{selected.credit && <a href={selected.credit} target="_blank" rel="noreferrer">
      Image credit
    </a>}
  </>
}
