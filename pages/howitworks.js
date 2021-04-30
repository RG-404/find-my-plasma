const howitworks = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto md:px-4 px-7">
      {[
        "The rising of covid cases left a lot of people in need of plasma. Due to \
        this, many are using the help of social media to ask for aid. However, \
        these request are scattered all over media in an unorganized manner. We \
        created this platform which works solely for the purpose of listing \
        patients who are in immediate need so that the donor can find and help \
        them.",
      ].map((item, index) => (
        <p className="mb-4 leading-8 " key={`htw_list_1_${index}`}>
          {item}
        </p>
      ))}
      <p className="text-xl mb-8 font-bold">Conditions for donors:</p>
      {[
        "You can donate only after 14 days of a Covid-19 positive report, \
          if asymptomatic and 14 days after the symptoms have disappeared, if \
          symptomatic.",
        "If you took COVID-19 vaccine, you cannot donate until 28 days have passed.",
        "Women who have ever been pregnant cannot donate plasma.",
        "You are not eligible to donate if you have a lack of antibodies in your blood.",
      ].map((item, index) => (
        <p className="mb-8">-&emsp;{item}</p>
      ))}
      <p className="text-xl mb-8 font-bold">How to use this site?</p>
      {[
        "You can donate only after 14 days of a Covid-19 positive report, \
          if asymptomatic and 14 days after the symptoms have disappeared, if \
          symptomatic.",
        "If you took COVID-19 vaccine, you cannot donate until 28 days have passed.",
        "Women who have ever been pregnant cannot donate plasma.",
        "You are not eligible to donate if you have a lack of antibodies in your blood.",
      ].map((item, index) => (
        <p className="mb-8">-&emsp;{item}</p>
      ))}
    </div>
  );
};

export default howitworks;
