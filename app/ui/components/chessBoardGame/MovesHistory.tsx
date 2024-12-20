export default function MovesHistory({
  movesHistory,
  extraClasses,
}: {
  movesHistory: string[];
  extraClasses?: string;
}) {
  return (
    <div
      className={`flex justify-center bg-secondary py-xs text-sm ${extraClasses}`}
    >
      {movesHistory.length ? (
        <>
          {movesHistory.length > 10 && <span>(...)</span>}
          {movesHistory.slice(-10).map((move, index) => {
            const globalIndex = movesHistory.indexOf(move); // Índice global en el historial completo
            const isWhiteMove = (globalIndex + 1) % 2 === 1; // Determina si es movimiento de blancas
            const moveNumber = Math.floor(globalIndex / 2) + 1; // Calcula el número de jugada
            return (
              <span key={index} className={isWhiteMove ? "" : "mr-sm"}>
                {isWhiteMove ? `${moveNumber}. ` : ", "}
                {move}
              </span>
            );
          })}
        </>
      ) : (
        <span>No moves yet</span>
      )}
    </div>
  );
}
