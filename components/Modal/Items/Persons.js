export default function Persons({ year, source, personList }) {

    const titleList = ["Yapımcı", "Yönetmen", "Senarist", "Sunucu", "Oyuncu", "Söz Yazarı", "Besteleyen"];

    return (

        <div className="preview-modal-text-right">
            {personList ?
                <>{
                    titleList.map((title, index) => {
                        const persons = personList.filter(i => i.Type === index);
                        return <div key={index} className="mb-4"> {persons.length > 0 ? <span className="preview-modal-text-title mb-2">{title}</span> : <></>}
                            <span className="preview-modal-text-content"> {persons.map((person, index) => {
                                return <span key={index}>{person.Name.trim() + (index < (persons.length - 1) ? ", " : "")}</span>
                            })}
                            </span> </div>;
                    })} </> : <></>}

            {
                source !== null ?
                    <div className="mb-4"> <span className="preview-modal-text-title mb-2">Kaynak</span>
                        <span className="preview-modal-text-content">  {source}
                        </span> </div>
                    : ""}


            {
                year > 0 ?
                    <div className="mb-4"> <span className="preview-modal-text-title mb-2">Yapım Yılı</span>
                        <span className="preview-modal-text-content">  {year !== null ? year : ""}
                        </span> </div> : ""}
        </div>
    );
}
